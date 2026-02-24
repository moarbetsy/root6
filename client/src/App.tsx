import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Link, useLocation } from 'wouter';
import { 
  Menu, X, Calendar, Leaf, Salad, Clock, Heart, Sprout, 
  ChevronDown, ChevronUp, User, Users, ShieldCheck, 
  MessageCircle, ArrowRight, Info
} from 'lucide-react';
import NotFound from '@/pages/NotFound';

// --- Routes ---
const PATHS = {
  home: '/',
  about: '/about',
  programs: '/programs',
  howItWorks: '/how-it-works',
  forParents: '/for-parents',
  faqs: '/faqs',
  contact: '/contact',
} as const;

const NAV_ITEMS: { label: string; path: string }[] = [
  { label: 'Home', path: PATHS.home },
  { label: 'About', path: PATHS.about },
  { label: 'Programs', path: PATHS.programs },
  { label: 'How It Works', path: PATHS.howItWorks },
  { label: 'For Parents', path: PATHS.forParents },
  { label: 'FAQs', path: PATHS.faqs },
  { label: 'Contact', path: PATHS.contact },
];

// --- Theme Constants ---
const COLORS = {
  primary: '#C1E1C1', // Light Green
  secondary: '#5D4037', // Grounded Brown
  background: '#FFFDF5', // Warm Cream
  text: '#4E342E',
  accent: '#A5D6A7'
};

const AppContent = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top and close mobile menu on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location]);

  // Layout Components
  const Navigation = () => (
    <nav className="sticky top-0 z-50 shadow-sm border-b" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href={PATHS.home} className="flex-shrink-0 flex items-center space-x-2">
            <Sprout className="w-8 h-8" style={{ color: COLORS.secondary }} />
            <span className="text-2xl font-bold tracking-tight" style={{ color: COLORS.secondary }}>Root to Rise</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={`px-1 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  location === path 
                    ? `border-[#5D4037] text-[#5D4037]` 
                    : 'border-transparent text-gray-600 hover:text-[#5D4037]'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href={PATHS.contact}
              className="ml-4 px-6 py-2 rounded-full font-bold shadow-sm transition-transform hover:scale-105"
              style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
            >
              Book a Free Intro Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              style={{ color: COLORS.secondary }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFFDF5] border-b animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className="block w-full text-left px-3 py-4 text-lg font-medium border-b border-gray-100"
                style={{ color: COLORS.secondary }}
              >
                {label}
              </Link>
            ))}
            <Link
              href={PATHS.contact}
              className="block w-full mt-4 mb-4 px-6 py-4 rounded-xl font-bold text-center"
              style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
            >
              Book a Free Intro Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="pt-16 pb-8 px-4 mt-20" style={{ backgroundColor: '#F5F2EA', color: COLORS.secondary }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5" /> Root to Rise Coaching
          </h3>
          <p className="opacity-90 leading-relaxed">
            Helping teens and adults with special needs build healthy routines for life.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link key={path} href={path} className="text-left text-sm hover:underline opacity-80">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Disclaimer</h4>
          <p className="text-xs opacity-70 leading-relaxed italic">
            Root to Rise Coaching provides educational and lifestyle coaching only and does not replace medical, nutritional, or mental health care.
          </p>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-gray-300 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Root to Rise Coaching. All rights reserved.
      </div>
    </footer>
  );

  // --- Page Sections ---

  const Hero = ({ headline, subheadline = '', body, ctaText = 'Book a Free Intro Call', showCta = true }: { headline: string; subheadline?: string; body: string; ctaText?: string; showCta?: boolean }) => (
    <div className="py-16 md:py-24 px-4 bg-white/40">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: COLORS.secondary }}>
          {headline}
        </h1>
        {subheadline && (
          <h2 className="text-xl md:text-2xl mb-8 font-medium opacity-80">
            {subheadline}
          </h2>
        )}
        <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto opacity-90">
          {body}
        </p>
        {showCta && (
          <Link 
            href={PATHS.contact}
            className="inline-block px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
          >
            {ctaText || "Book a Free Intro Call"}
          </Link>
        )}
      </div>
    </div>
  );

  const SectionHeading = ({ children, centered = true }: { children: React.ReactNode; centered?: boolean }) => (
    <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${centered ? 'text-center' : ''}`} style={{ color: COLORS.secondary }}>
      {children}
    </h2>
  );

  // --- Individual Pages ---

  const HomePage = () => (
    <div className="animate-in fade-in duration-700">
      <Hero 
        headline="Root to Rise Coaching"
        subheadline="Helping teens and adults with special needs build healthy routines for life"
        body="Gentle, structured online coaching focused on movement, nutrition, routine, and wellness—designed to support confidence, independence, and everyday wellbeing."
      />

      <section className="py-20 px-4 max-w-5xl mx-auto">
        <SectionHeading>A calm, supportive approach to healthy living</SectionHeading>
        <p className="text-xl text-center leading-relaxed opacity-90">
          Building a healthy lifestyle can feel overwhelming—especially for individuals who need structure, clarity, and encouragement. Root to Rise Coaching offers step‑by‑step guidance that meets each person where they are. This is not about perfection or pressure. It's about creating simple routines, celebrating small wins, and building habits that last.
        </p>
      </section>

      <section className="py-20 px-4 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Who This Is For</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { title: "Teens (13–18)", desc: "With developmental, learning, or cognitive differences" },
              { title: "Young Adults", desc: "Building independence and daily structure" },
              { title: "Adults", desc: "Who benefit from clear routines and accountability" },
              { title: "Parents/Caregivers", desc: "Seeking safe, respectful coaching support" }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <User className="mb-4 w-10 h-10" style={{ color: COLORS.secondary }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.secondary }}>{item.title}</h3>
                <p className="opacity-80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 italic opacity-60">Note: Programs are adapted to individual needs, abilities, and sensory preferences.</p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <SectionHeading>What We Focus On</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
          {[
            { icon: <Leaf />, title: "Movement", body: "Adaptive, confidence‑building fitness designed to feel safe, accessible, and achievable." },
            { icon: <Salad />, title: "Nutrition", body: "Simple, realistic nutrition habits that respect sensory needs and individual preferences." },
            { icon: <Clock />, title: "Routine", body: "Daily structure that reduces stress, builds consistency, and supports independence." },
            { icon: <Heart />, title: "Wellness", body: "Emotional regulation tools, self‑care practices, and stress‑management strategies." },
            { icon: <Sprout />, title: "Growth", body: "Building self‑esteem, confidence, and a sense of personal capability." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl flex flex-col items-center text-center border-2 border-transparent hover:border-[#C1E1C1] transition-all bg-white shadow-sm group">
              <div className="p-4 rounded-full mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: COLORS.primary }}>
                <div style={{ color: COLORS.secondary }}>{item.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.secondary }}>{item.title}</h3>
              <p className="text-sm opacity-80">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <SectionHeading>How Coaching Helps</SectionHeading>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Encourages healthy habits without pressure or shame",
            "Builds consistency through repetition and predictability",
            "Supports confidence and self‑trust",
            "Adapts to different learning styles and abilities",
            "Focuses on progress at a comfortable pace"
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
              <ShieldCheck className="mt-1 flex-shrink-0" style={{ color: COLORS.primary }} />
              <span className="font-medium opacity-90">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="p-10 rounded-3xl text-center border-4 border-dashed" style={{ borderColor: COLORS.primary }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.secondary }}>For Parents & Caregivers</h3>
          <p className="text-lg mb-8 opacity-90">Your trust matters. Coaching is built around safety, consent, and respect for autonomy.</p>
          <p className="font-bold text-xl mb-6">"You're not handing your loved one off—you're partnering in their growth."</p>
          <Link href={PATHS.forParents} className="underline font-bold text-lg hover:opacity-70 transition-opacity">Learn more about our partnership</Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading>A gentle path from where you are to where you want to be</SectionHeading>
          <p className="text-xl mb-10 opacity-80">Root to Rise Coaching is about steady progress, not quick fixes. With patience, structure, and encouragement, healthy habits can grow—one step at a time.</p>
          <Link 
            href={PATHS.contact}
            className="inline-block px-10 py-5 rounded-full text-xl font-bold shadow-lg"
            style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
          >
            Book a Free Intro Call
          </Link>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="animate-in fade-in duration-700">
      <Hero 
        headline="A gentle, structured approach to growth—rooted in respect and care"
        body="I believe that everyone deserves the opportunity to feel strong, capable, and supported in their daily life. Root to Rise Coaching was created to offer calm, consistent, and compassionate guidance for teens and adults with special needs—without pressure, judgment, or unrealistic expectations."
        ctaText="Book a Free Intro Call"
      />

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <SectionHeading centered={false}>Why I do this work</SectionHeading>
        <p className="text-lg mb-6 leading-relaxed">I've seen how overwhelming "healthy living" can feel—especially for individuals who benefit from routine, predictability, and clear support. Too often, fitness and nutrition spaces move too fast, expect too much, or fail to adapt to different needs. I started Root to Rise Coaching to create something different.</p>
        <div className="bg-[#F5F2EA] p-8 rounded-2xl mb-8">
          <p className="font-bold mb-4 text-xl">A space where:</p>
          <ul className="space-y-3">
            {["Progress is gentle and achievable", "Effort is celebrated", "Routines are clear and supportive", "Growth happens at a comfortable pace"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.secondary }}></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xl font-medium">My goal is not to push people to change who they are, but to help them build habits that make everyday life feel more manageable and empowering.</p>
      </section>

      <section className="py-20 px-4 bg-white/60">
        <div className="max-w-4xl mx-auto">
          <SectionHeading centered={false}>My approach</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {["Supportive, not clinical", "Structured, not rigid", "Encouraging, not pressuring", "Individualized, not one‑size‑fits-all"].map((text, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border-l-4" style={{ borderLeftColor: COLORS.primary }}>
                <span className="font-bold text-lg">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed">Each program is adapted to the person in front of me—their abilities, preferences, sensory needs, and goals. We focus on simple routines, repetition, and consistency, because that's where real confidence grows.</p>
        </div>
      </section>
    </div>
  );

  const ProgramsPage = () => (
    <div className="animate-in fade-in duration-700">
      <Hero 
        headline="Supportive coaching designed to grow healthy habits—step by step"
        subheadline=""
        body="Root to Rise Coaching offers structured, compassionate online programs for teens and adults with special needs. Programs are non‑clinical, strength‑based, and adapted to individual abilities, preferences, and sensory needs."
        ctaText="Book a Free Intro Call"
      />

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 flex flex-col h-full">
            <div className="mb-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{ backgroundColor: COLORS.primary }}><User size={32} color={COLORS.secondary}/></div>
              <div>
                <h3 className="text-3xl font-bold" style={{ color: COLORS.secondary }}>1:1 Online Coaching</h3>
                <p className="text-sm font-medium opacity-60">Personalized support for meaningful, lasting change</p>
              </div>
            </div>
            <p className="text-lg mb-8 leading-relaxed opacity-80">One‑to‑one coaching provides individualized guidance in a calm, focused environment. This option is ideal for participants who benefit from personal attention, flexibility, and tailored routines.</p>
            
            <div className="flex-grow space-y-4 mb-8">
              <h4 className="font-bold text-xs uppercase tracking-widest opacity-60">What's included</h4>
              <ul className="grid grid-cols-1 gap-2 text-sm">
                {["Weekly or bi‑weekly live sessions (30–60 min)", "Personalized fitness, nutrition, and routine planning", "Adaptive movement options (chair‑based, low‑impact)", "Simple habit‑building tools and visual supports", "Ongoing encouragement and accountability", "Optional caregiver or parent check‑ins"].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <Leaf size={14} className="mt-1 flex-shrink-0" style={{ color: COLORS.primary }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 rounded-2xl bg-[#FFFDF5] mb-8 border border-[#C1E1C1]">
              <p className="font-bold mb-1">Best for:</p>
              <p className="text-sm opacity-80">Teens who need individualized structure | Young adults building independence | Adults seeking accountability</p>
            </div>
            
            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm font-medium opacity-60 italic">Format: Online (Live)</span>
              <Link href={PATHS.contact} className="inline-block px-6 py-3 rounded-full font-bold shadow-md hover:translate-y-[-2px] transition-transform" style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}>Get Started</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#5D4037] rounded-3xl p-10 shadow-xl text-white flex flex-col h-full">
            <div className="mb-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#A5D6A7]"><Users size={32} color={COLORS.secondary}/></div>
              <div>
                <h3 className="text-3xl font-bold">Small Group Coaching</h3>
                <p className="text-sm font-medium opacity-60">Community, routine, and shared growth</p>
              </div>
            </div>
            <p className="text-lg mb-8 leading-relaxed opacity-80">Small group coaching brings together 3–6 participants with similar needs or age ranges. Sessions focus on shared routines, gentle movement, and supportive connection.</p>
            
            <div className="flex-grow space-y-4 mb-8">
              <h4 className="font-bold text-xs uppercase tracking-widest opacity-40">What's included</h4>
              <ul className="grid grid-cols-1 gap-2 text-sm opacity-90">
                {["Weekly live group sessions", "Guided adaptive workouts and wellness practices", "Simple, repeatable routines", "Encouragement through shared progress", "Clear session structure and predictable flow"].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <Leaf size={14} className="mt-1 flex-shrink-0 text-[#A5D6A7]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/10 mb-8 border border-white/20">
              <p className="font-bold mb-1">Best for:</p>
              <p className="text-sm opacity-80">Participants who enjoy gentle social interaction | Building group confidence | Practicing routines with peer support</p>
            </div>
            
            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm font-medium opacity-60 italic">Format: Online (Live)</span>
              <Link href={PATHS.contact} className="inline-block px-6 py-3 rounded-full font-bold shadow-md bg-[#A5D6A7] text-[#5D4037] hover:translate-y-[-2px] transition-transform">Inquire Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Examples */}
      <section className="py-20 px-4 bg-[#F5F2EA]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Representative Success Stories</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Teen with Autism",
                sub: "Alex, 15 years old",
                challenge: "Difficulty transitioning between activities, inconsistent eating routines, anxiety",
                outcome: "Follows daily routines with fewer transition issues, increased confidence in self-care"
              },
              {
                title: "Young Adult with ADHD",
                sub: "Jordan, 19 years old",
                challenge: "Forgetting meals, skipping workouts, feeling overwhelmed by planning",
                outcome: "Developed a consistent morning and evening routine, regular participation in wellness tasks"
              },
              {
                title: "Adult with Anxiety",
                sub: "Sam, 27 years old",
                challenge: "Overwhelm in noisy environments, difficulty initiating movement, stress management",
                outcome: "Improved ability to manage stress through self-regulation techniques, consistent meal habits"
              }
            ].map((story, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                <h4 className="font-bold text-xl mb-1" style={{ color: COLORS.secondary }}>{story.title}</h4>
                <p className="text-sm mb-4 opacity-60 italic">{story.sub}</p>
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-40">Challenges</span>
                  <p className="text-sm">{story.challenge}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest block mb-1 text-[#A5D6A7]">Outcome</span>
                  <p className="text-sm font-medium">{story.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const HowItWorksPage = () => (
    <div className="animate-in fade-in duration-700">
      <Hero 
        headline="A clear, supportive process—designed to feel safe and manageable"
        body="Root to Rise Coaching follows a simple, predictable structure so participants and families know exactly what to expect. The process is calm, flexible, and adapted to individual needs—without pressure or overwhelm."
      />

      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="space-y-16">
          {[
            {
              step: "01",
              title: "Free Intro Call",
              body: "A relaxed, no‑obligation introductory call where we talk about needs, goals, and sensory considerations. This call is about connection and clarity, not commitment."
            },
            {
              step: "02",
              title: "Personalized Intake & Planning",
              body: "Using a simple form, we gather information about current habits and movement comfort level to create a plan focused on realistic goals and gradual progress."
            },
            {
              step: "03",
              title: "Coaching Sessions",
              body: "Online sessions in a calm, structured environment. We follow a clear, repeatable format to support comfort and consistency in movement and routine building."
            },
            {
              step: "04",
              title: "Ongoing Support & Adjustments",
              body: "Progress is never rushed. We adjust goals as you evolve, celebrate effort, and (when appropriate) coordinate with caregivers to support consistency at home."
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="text-5xl font-black opacity-10 leading-none" style={{ color: COLORS.secondary }}>{item.step}</div>
              <div className="flex-grow pt-2 border-l-4 pl-6 md:pl-8" style={{ borderLeftColor: COLORS.primary }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.secondary }}>{item.title}</h3>
                <p className="text-lg leading-relaxed opacity-80">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading>A pace that respects the individual</SectionHeading>
          <p className="text-xl mb-6 italic opacity-80">"There are no deadlines to 'catch up' and no pressure to perform. Growth happens step by step, at a pace that feels right."</p>
        </div>
      </section>
    </div>
  );

  const ParentsPage = () => (
    <div className="animate-in fade-in duration-700">
      <Hero 
        headline="A safe, respectful partnership—built on trust and communication"
        body="This work is collaborative. You are not handing your loved one off—you are partnering in their growth."
        ctaText="Book an Intro Call"
      />

      <section className="py-20 px-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SectionHeading centered={false}>Your role as a parent or caregiver</SectionHeading>
          <p className="text-lg mb-6 leading-relaxed">Your involvement is welcomed and respected. Depending on the individual's needs, you may join the intro call, support routines at home, or receive updates.</p>
          <p className="text-lg">At the same time, coaching prioritizes the individual's voice, autonomy, and sense of ownership whenever appropriate.</p>
        </div>
        <div className="bg-[#F5F2EA] p-8 rounded-3xl border border-[#C1E1C1]">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck style={{ color: COLORS.secondary }} /> Safety, Boundaries & Trust
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            {["Non‑clinical scope", "Clear expectations", "Consent and confidentiality", "Inclusive language", "Defined session structure"].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <ArrowRight size={14} style={{ color: COLORS.secondary }} /> {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs italic opacity-60 leading-relaxed">Coaching does not include diagnosis, therapy, or medical treatment, and is designed to complement professional care when needed.</p>
        </div>
      </section>
    </div>
  );

  const FAQsPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqs = [
      { q: "Is this therapy or medical treatment?", a: "No. Root to Rise Coaching provides educational and lifestyle coaching only. It does not include diagnosis, therapy, or medical treatment." },
      { q: "Who is this coaching for?", a: "Teens (13+) with developmental/learning differences, young adults building independence, and adults seeking structure." },
      { q: "What does a typical coaching session look like?", a: "Sessions are calm and predictable. They include gentle movement, nutrition habit guidance, and routine planning." },
      { q: "Is coaching done online or in person?", a: "Coaching sessions are held online for convenience and comfort. However, events and workshops will be held in person." },
      { q: "Do you provide meal plans or diets?", a: "No. We focus on simple nutrition habits and education, respecting sensory preferences and individual needs." }
    ];

    return (
      <div className="animate-in fade-in duration-700 max-w-4xl mx-auto px-4 py-20">
        <SectionHeading>Clear answers to help you feel confident</SectionHeading>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left font-bold text-lg"
                style={{ color: COLORS.secondary }}
              >
                {faq.q}
                {openIndex === i ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('sending');
      setErrorMsg('');
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          setStatus('success');
          setName('');
          setEmail('');
          setMessage('');
        } else {
          setStatus('error');
          setErrorMsg(data.error || 'Something went wrong. Please try again.');
        }
      } catch {
        setStatus('error');
        setErrorMsg('Network error. Please try again.');
      }
    };

    return (
      <div className="animate-in fade-in duration-700 max-w-4xl mx-auto px-4 py-20">
        <SectionHeading>Ready to take the first step?</SectionHeading>
        <p className="text-center text-xl mb-12 opacity-80">Booking a free intro call is a relaxed, no-obligation way to see if we are a good fit.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center">
            <Calendar size={48} className="mx-auto mb-6" style={{ color: COLORS.secondary }} />
            <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.secondary }}>Schedule Online</h3>
            <p className="mb-8 opacity-70">Pick a time that works best for your schedule.</p>
            {calendlyUrl ? (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full mt-6 py-4 rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
              >
                Launch Scheduler
              </a>
            ) : (
              <>
                <div className="h-40 bg-[#F5F2EA] flex items-center justify-center rounded-2xl border-2 border-dashed border-[#C1E1C1] text-sm italic font-medium">
                  Add VITE_CALENDLY_URL to your .env to link your Calendly
                </div>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="inline-block w-full mt-6 py-4 rounded-xl font-bold shadow-md opacity-80" style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}>
                  Set up Calendly
                </a>
              </>
            )}
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center">
            <MessageCircle size={48} className="mx-auto mb-6" style={{ color: COLORS.secondary }} />
            <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.secondary }}>Send a Message</h3>
            {status === 'success' ? (
              <p className="text-lg font-medium py-6" style={{ color: COLORS.secondary }}>Thank you! We&apos;ll get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-40">Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-xl bg-[#F5F2EA] border-none focus:ring-2 focus:ring-[#C1E1C1]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-40">Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-[#F5F2EA] border-none focus:ring-2 focus:ring-[#C1E1C1]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-40">Message</label>
                  <textarea rows={3} required value={message} onChange={e => setMessage(e.target.value)} className="w-full p-3 rounded-xl bg-[#F5F2EA] border-none focus:ring-2 focus:ring-[#C1E1C1]" />
                </div>
                {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
                <button type="submit" disabled={status === 'sending'} className="w-full py-4 rounded-xl font-bold shadow-md disabled:opacity-70" style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}>
                  {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-16 p-6 rounded-2xl bg-white/40 text-xs text-center border">
          <p className="opacity-60 leading-relaxed italic">Root to Rise Coaching provides educational and lifestyle coaching only and does not replace medical, nutritional, or mental health care.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#C1E1C1] selection:text-[#5D4037]" style={{ backgroundColor: COLORS.background, color: COLORS.text }}>
      <Navigation />
      <main>
        <Switch>
          <Route path={PATHS.home} component={HomePage} />
          <Route path={PATHS.about} component={AboutPage} />
          <Route path={PATHS.programs} component={ProgramsPage} />
          <Route path={PATHS.howItWorks} component={HowItWorksPage} />
          <Route path={PATHS.forParents} component={ParentsPage} />
          <Route path={PATHS.faqs} component={FAQsPage} />
          <Route path={PATHS.contact} component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
