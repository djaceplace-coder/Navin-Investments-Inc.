-- Navin Investment Inc. - Supabase Schema
-- Run this script in your Supabase SQL Editor

-- 1. Custom Types
CREATE TYPE user_role AS ENUM ('client', 'agent', 'admin');
CREATE TYPE kyc_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE agent_status AS ENUM ('pending', 'active', 'suspended');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'lost');
CREATE TYPE policy_status AS ENUM ('active', 'pending', 'expired', 'cancelled');
CREATE TYPE claim_status AS ENUM ('submitted', 'under_review', 'approved', 'denied');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'buy', 'sell', 'premium_payment');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'flagged');

-- 2. Profiles Table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role user_role DEFAULT 'client'::user_role NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Agents Table
CREATE TABLE agents (
    id UUID REFERENCES profiles(id) PRIMARY KEY,
    status agent_status DEFAULT 'pending'::agent_status NOT NULL,
    license_number TEXT,
    specialties TEXT[],
    total_aum DECIMAL(15, 2) DEFAULT 0.00,
    commission_rate DECIMAL(5, 4) DEFAULT 0.0000, -- e.g. 0.0150 for 1.5%
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Clients Table
CREATE TABLE clients (
    id UUID REFERENCES profiles(id) PRIMARY KEY,
    assigned_agent_id UUID REFERENCES agents(id),
    kyc_status kyc_status DEFAULT 'pending'::kyc_status NOT NULL,
    risk_tolerance TEXT, -- e.g., 'low', 'medium', 'high'
    investment_goals TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Leads Table (for Agents Pipeline)
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    status lead_status DEFAULT 'new'::lead_status NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Portfolios Table
CREATE TABLE portfolios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g., 'Equities', 'Digital Assets'
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Policies Table (Insurance)
CREATE TABLE policies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) NOT NULL,
    type TEXT NOT NULL, -- e.g., 'Term Life', 'Property'
    status policy_status DEFAULT 'pending'::policy_status NOT NULL,
    coverage_amount DECIMAL(15, 2) NOT NULL,
    premium_amount DECIMAL(10, 2) NOT NULL,
    premium_frequency TEXT DEFAULT 'monthly', -- 'monthly', 'annually'
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Claims Table
CREATE TABLE claims (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    policy_id UUID REFERENCES policies(id) NOT NULL,
    incident_date DATE NOT NULL,
    description TEXT,
    status claim_status DEFAULT 'submitted'::claim_status NOT NULL,
    claim_amount DECIMAL(15, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Transactions Table
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) NOT NULL,
    portfolio_id UUID REFERENCES portfolios(id), -- optional, null for general deposits/withdrawals
    type transaction_type NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status transaction_status DEFAULT 'pending'::transaction_status NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- Row Level Security (RLS) Policies

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile. Admins can read all.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins have full access to profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Agents: Agents can view their own record. Admins can view/edit all.
CREATE POLICY "Agents can view own record" ON agents FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins have full access to agents" ON agents FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Clients: Clients can view own record. Assigned agents can view their clients. Admins have full access.
CREATE POLICY "Clients can view own record" ON clients FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Agents can view their assigned clients" ON clients FOR SELECT USING (
  assigned_agent_id = auth.uid()
);
CREATE POLICY "Admins have full access to clients" ON clients FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Leads: Agents can manage their own leads. Admins have full access.
CREATE POLICY "Agents can manage own leads" ON leads FOR ALL USING (agent_id = auth.uid());
CREATE POLICY "Admins have full access to leads" ON leads FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Portfolios/Policies/Claims/Transactions: Client can view own. Assigned Agent can view. Admin has full access.
-- (Example for Portfolios)
CREATE POLICY "Clients can view own portfolios" ON portfolios FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Agents can view assigned client portfolios" ON portfolios FOR SELECT USING (
  EXISTS (SELECT 1 FROM clients WHERE clients.id = portfolios.client_id AND clients.assigned_agent_id = auth.uid())
);
CREATE POLICY "Admins have full access to portfolios" ON portfolios FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
