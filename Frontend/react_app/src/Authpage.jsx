import { useState } from "react";
import LoginForm from "./signup/login";
import SignUpForm from "./signup/SignUp";

const voices = [
  {
    quote: "I'm not just selling tomatoes anymore. I'm telling their story.",
    name: "Ramesh, 34",
    role: "Onion & tomato farmer · Nashik",
    img: "https://images.unsplash.com/photo-1707721690544-781fe6ede937?w=160&h=160&fit=crop",
  },
  {
    quote: "I finally know who grew the dal on my plate. That changes everything.",
    name: "Anita, 29",
    role: "Home cook · Pune",
    img: "https://images.unsplash.com/photo-1748342319942-223b99937d4e?w=160&h=160&fit=crop",
  },
  {
    quote: "The PM-Kisan update reached me before the patwari did. That's the village we want.",
    name: "Sukhdev, 58",
    role: "Wheat farmer · Hisar",
    img: "https://images.pexels.com/photos/29039800/pexels-photo-29039800.jpeg?w=160&h=160&fit=crop",
  },
];

const pillars = [
  { label: "Share tips",    sub: "Wisdom from the soil" },
  { label: "Raise issues",  sub: "When something's off" },
  { label: "Know policies", sub: "Schemes, simply put"  },
  { label: "Build circles", sub: "Farmer to farmer"     },
];

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [voiceIdx, setVoiceIdx] = useState(0);
  const v = voices[voiceIdx];
  

  return (
    <div className="h-screen w-full grid grid-cols-[1.1fr_1fr] border ">
     {/* left pannel */}
      <div className="relative hidden md:flex flex-col bg-[#1A4331] p-15 overflow-hidden py-16 justify-between items-center">
        {/* Background image */}
         <img
    src="https://images.pexels.com/photos/29039800/pexels-photo-29039800.jpeg?auto=compress&w=900"
    alt="Indian farmer"
    className="absolute inset-0 h-full w-full object-cover"
  />
  
  {/* dark overlay taki text readable rahe */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0e2a1d] via-[#0e2a1d]/60 to-[#0e2a1d]/20" />

  {/* Step 3 — Actual content, image ke upar */}
  <div className="relative z-10 flex flex-col justify-between h-full text-white gap-6">

    {/* Brand */}
    <h2 className="text-2xl font-bold  h-10 w-50 ">KissanConnect</h2>

    {/* Tagline */}
     <div>
      <p className="text-lg uppercase tracking-widest text-white/70 font-semibold fon">
        Trust, planted between rows.
      </p>
      <h3 className="mt-3 text-4xl font-semibold leading-tight">
        Where the farmer, family and field{" "}
        <span className="text-[#F4C9B5]">speak the same language.</span>
      </h3>
    </div>
    {/* Quote card */}
<div className="mt-6 bg-white/10 border border-white/15 rounded-2xl p-5 w-lg">
  <p className="text-xl leading-snug">"{v.quote}"</p>
  <div className="mt-4 flex items-center gap-3">
    {/* Avatar with initials */}
    <div className="h-10 w-10 rounded-full bg-white/20 grid place-items-center font-semibold text-sm border-2 border-white/40">
      {v.initials}
    </div>
    <div>
      <div className="font-semibold text-sm">{v.name}</div>
      <div className="text-xs text-white/70">{v.role}</div>
    </div>
  </div>
</div>
{/* Dots — click karo quote change hoga */}
<div className="mt-4 mb-4 flex gap-2">
  {voices.map((_, i) => (
    <button
      key={i}
      onClick={() => setVoiceIdx(i)}
      className={`h-1.5 rounded-full transition-all ${
        i === voiceIdx ? "w-8 bg-[#D95D39]" : "w-3 bg-white/35"
      }`}
    />
  ))}
</div>

{/* Pillars - bottom mein */}
<div className="grid grid-cols-2 gap-2 mt-6">
  {pillars.map((p) => (
    <div key={p.label} className="bg-white/10 border border-white/10 rounded-xl p-3">
      <div className="font-semibold text-sm">{p.label}</div>
      <div className="text-[11px] text-white/65 mt-0.5">{p.sub}</div>
    </div>
  ))}
</div>

  </div>
      </div>

      {/* RIGHT PANEL */}
<div className="flex flex-col justify-center items-center bg-[#F7F5F0] h-screen overflow-y-auto px-12">
  <div className="w-full max-w-sm mx-auto justify-center">

    {/* Top row — trust badge + toggle */}
    <div className="flex items-center justify-between mb-10">
      <div className="inline-flex items-center gap-2 bg-[#1A4331]/10 border border-[#1A4331]/20 rounded-full px-3 py-1">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-[#1A4331] p-0.5 px-2 bg-[#D95D39]/20 rounded">
          ✓ Verified · Respectful · Yours
        </span>
      </div>

      {/* Toggle */}
      <div className="flex gap-1 bg-white border border-[#E5E2D9] p-1 rounded-xl">
        <button
          onClick={() => setMode('login')}
          className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all ${
            mode === 'login'
              ? 'bg-[#1A4331] text-white'
              : 'text-[#758079]'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all ${
            mode === 'signup'
              ? 'bg-[#1A4331] text-white'
              : 'text-[#758079]'
          }`}
        >
          Sign Up
        </button>
      </div>
    </div>

    {/* Heading */}
    <h2
      className="text-4xl font-bold text-[#1A4331] mb-3 leading-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {mode === 'login' ? 'Welcome back to the aangan.' : 'Pull up a charpai.'}
    </h2>
    <p className="text-sm text-[#758079] mb-8">
      {mode === 'login'
        ? 'Sign in to share a tip, raise an issue, or simply check on the people who feed you.'
        : 'Create your account and become part of the community.'}
    </p>

    {/* Form */}
    {mode === 'login'
      ? <LoginForm onSwitch={() => setMode('signup')} />
      : <SignUpForm onSwitch={() => setMode('login')} />
    }

    {/* Switch mode */}
    <p className="mt-6 text-sm text-[#4B5550] text-center">
      {mode === 'login' ? 'Naya hain? ' : 'Pehle se account hai? '}
      <button
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="font-semibold text-[#1A4331] hover:text-[#D95D39] transition-colors"
      >
        {mode === 'login' ? 'Account banao' : 'Sign in karo'}
      </button>
    </p>

    {/* Stats */}
    <div className="mt-8 pt-6 border-t border-[#E5E2D9] grid grid-cols-3 gap-3">
      {[
        { k: "12,400+", v: "Farmers & families" },
        { k: "0₹",      v: "To join, forever"   },
        { k: "Safe",    v: "No data selling"     },
      ].map((s) => (
        <div key={s.v}>
          <div className="text-lg font-semibold text-[#1A4331]">{s.k}</div>
          <div className="text-[11px] text-[#758079] mt-1">{s.v}</div>
        </div>
      ))}
    </div>

  </div>
</div>
    </div>
  );
}

export default AuthPage;