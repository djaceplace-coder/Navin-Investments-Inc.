import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  ShieldCheck, 
  Users, 
  Building2, 
  TrendingUp, 
  Bitcoin, 
  Coins, 
  HeartHandshake, 
  PieChart, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

export function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero */}
      <section className="relative pt-20 pb-28 lg:pt-36 lg:pb-40 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Photorealistic editorial hero image (Unsplash placeholder) */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[3rem] sm:rounded-b-[4rem]">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt="Modern sharp corporate interior" 
            className="w-full h-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        </div>
        
        <motion.div 
          className="max-w-3xl relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-[40px] sm:text-6xl lg:text-7xl font-bold font-heading text-slate-900 leading-[1.1] mb-6 tracking-tight"
          >
            Investing and protection, finally under one roof.
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-2xl text-slate-600 mb-10 max-w-2xl leading-relaxed"
          >
            30+ years of licensed expertise. Real human agents. Every asset class in one platform.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link to="/signup" className="bg-slate-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-slate-800 transition-all hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 text-center w-full sm:w-auto">
              Start Investing
            </Link>
            <Link to="/insurance/quote" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-base font-medium hover:bg-slate-50 transition-all active:scale-95 text-center w-full sm:w-auto shadow-sm">
              Get Covered
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-8">
            <Link to="/agents" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
              <Users className="w-5 h-5" />
              <span>Talk to an Agent</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Identity fork strip */}
      <section className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full -mt-10 sm:-mt-16 relative z-10">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: "Invest", desc: "Build a portfolio across all assets", icon: Briefcase, href: "/products" },
            { title: "Get Covered", desc: "Find the right insurance policy", icon: ShieldCheck, href: "/insurance" },
            { title: "Work With an Agent", desc: "Get expert human guidance", icon: Users, href: "/agents" },
            { title: "For Business", desc: "Platform and partner solutions", icon: Building2, href: "/for-business" }
          ].map((item, i) => (
            <Link 
              key={i} 
              to={item.href}
              className="min-w-[280px] snap-center sm:min-w-0 bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-200 transition-all group flex flex-col items-start hover:-translate-y-1 active:scale-95 sm:active:scale-100"
            >
              <div className="p-3.5 bg-slate-100/80 rounded-2xl mb-5 group-hover:bg-slate-900 group-hover:text-white transition-colors text-slate-700 shadow-sm">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. "Why Us" band */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-6">
              A real agency, not just an app.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              For 30 years, we've helped clients protect their downside and grow their upside. We combine the polish and speed of a modern wealth platform with the accredited, human expertise of a traditional brokerage.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:gap-3 transition-all">
              Learn about our model <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="border-l-2 border-slate-200 pl-6">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-5xl font-heading font-bold text-slate-900 mb-2">30+</motion.div>
              <div className="text-slate-600 font-medium">Years in business</div>
            </div>
            <div className="border-l-2 border-slate-200 pl-6">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-5xl font-heading font-bold text-slate-900 mb-2">5</motion.div>
              <div className="text-slate-600 font-medium">Asset classes covered</div>
            </div>
            <div className="border-l-2 border-slate-200 pl-6">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-5xl font-heading font-bold text-slate-900 mb-2">28</motion.div>
              <div className="text-slate-600 font-medium">Licensed regions</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product showcase */}
      <section className="py-24 bg-slate-900 text-white rounded-t-[40px] sm:rounded-none mt-12 sm:mt-0">
        <div className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <h2 className="text-4xl sm:text-4xl font-bold font-heading mb-4 tracking-tight">Every way to grow.</h2>
              <p className="text-slate-400 text-lg max-w-xl leading-relaxed">One account gives you access to a full spectrum of investable assets and insurance-linked products.</p>
            </div>
            <Link to="/products" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shadow-sm backdrop-blur-sm">
              View All Products
            </Link>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-4 sm:gap-6">
          {[
            { title: "Stocks & Equities", desc: "Trade global equities with deep liquidity.", icon: TrendingUp, href: "/products/stocks" },
            { title: "Crypto & Digital", desc: "Secure custody for major digital assets.", icon: Bitcoin, href: "/products/digital-assets" },
            { title: "Coins & Alts", desc: "Access alternative alternative asset classes.", icon: Coins, href: "/products/coins" },
            { title: "Insurance-Linked", desc: "Products that blend growth with protection.", icon: HeartHandshake, href: "/products/insurance-linked" },
            { title: "Managed Portfolios", desc: "Algorithmic allocation with human oversight.", icon: PieChart, href: "/products/managed" }
          ].map((prod, i) => (
            <Link 
              key={i}
              to={prod.href}
              className="min-w-[280px] sm:min-w-[320px] bg-slate-800/50 hover:bg-slate-800 p-8 rounded-3xl snap-start border border-slate-700/50 transition-colors group flex flex-col h-[280px]"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                <prod.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">{prod.title}</h3>
              <p className="text-slate-400 text-sm mb-auto">{prod.desc}</p>
              <div className="text-sm font-medium text-white flex items-center gap-2 group-hover:gap-3 transition-all mt-4">
                Learn more <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Agent spotlight */}
      <section className="py-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-6 tracking-tight">Meet your future advisor.</h2>
          <p className="text-lg text-slate-600 leading-relaxed">Technology is great for efficiency, but wealth and protection often require a conversation. Our licensed agents are here when you need them.</p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 gap-4 sm:gap-8 mb-12">
          {[
            { name: "Sarah Jenkins", role: "Equities & Wealth Specialist", exp: "12 yrs exp", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60" },
            { name: "David Chen", role: "Digital Assets Lead", exp: "8 yrs exp", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&auto=format&fit=crop&q=60" },
            { name: "Elena Rodriguez", role: "Insurance & Estate Planning", exp: "15 yrs exp", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60" }
          ].map((agent, i) => (
            <div key={i} className="min-w-[280px] snap-center sm:min-w-0 group relative rounded-3xl overflow-hidden aspect-[3/4] bg-slate-100 shadow-sm">
              <img src={agent.img} alt={agent.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-white/80 text-sm font-medium mb-2">{agent.exp}</div>
                <h3 className="text-2xl font-bold font-heading text-white mb-1">{agent.name}</h3>
                <p className="text-slate-300 text-sm mb-6">{agent.role}</p>
                <Link to="/agents" className="inline-flex bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium transition-all">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/agents" className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:gap-3 transition-all">
            Browse all agents <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. Trust/compliance bar */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Licensed Brokerage</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Member FINRA/SIPC*</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-medium">Bank-Grade Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">Operating in US & EU</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 lg:py-32 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-slate-900 mb-6 tracking-tight">Ready to secure your future?</h2>
        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Open an account in minutes, or speak with an agent to build a custom plan.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup" className="bg-slate-900 text-white px-8 py-4.5 rounded-full text-base font-medium hover:bg-slate-800 transition-all hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 shadow-md">
            Create an Account
          </Link>
          <Link to="/agents" className="bg-white text-slate-900 border border-slate-200 px-8 py-4.5 rounded-full text-base font-medium hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            Talk to an Agent
          </Link>
        </div>
      </section>

    </div>
  );
}
