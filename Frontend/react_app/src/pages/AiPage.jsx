import React, { useState } from "react";
import { MessageCircle, Sprout, X } from "lucide-react";
import KisanChat from "../components/KisanChat";

export default function AiPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main
      data-testid="ai-page-root"
      className="relative min-h-screen overflow-hidden bg-[#f4f7f5] text-[#1a2e22]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(29,158,117,0.08),transparent_42%,rgba(245,185,74,0.08))]" />

      <section className="relative flex min-h-screen items-center justify-center px-5 py-16 text-center">
        <div className="max-w-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
            <Sprout data-testid="page-sprout-icon" size={28} />
          </div>

          <p
            data-testid="page-eyebrow"
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700"
          >
            KissanConnect
          </p>

          <h1
            data-testid="page-title"
            className="text-3xl font-bold tracking-tight text-emerald-950 sm:text-5xl"
          >
            आपका अपना AI कृषि सहायक
          </h1>

          <p
            data-testid="page-description"
            className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5a7365] sm:text-base"
          >
            मौसम, फसल, कीट और मंडी भाव से जुड़े सवालों के लिए नीचे दिए गए सहायक से पूछें।
          </p>
        </div>
      </section>

      {isOpen && (
        <div
          data-testid="chat-floating-wrapper"
          className="chat-panel-anchor fixed bottom-[5.75rem] right-2 z-40 sm:right-6"
        >
          <KisanChat />
        </div>
      )}

      <button
        data-testid="floating-ai-toggle-btn"
        type="button"
        aria-label={isOpen ? "सहायक बंद करें" : "AI सहायक खोलें"}
        onClick={() => setIsOpen((previous) => !previous)}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-emerald-700 text-white shadow-[0_10px_28px_rgba(29,158,117,0.35)] transition-transform duration-200 hover:scale-105 active:scale-95 sm:right-6"
      >
        {isOpen ? (
          <X data-testid="close-chat-icon" size={25} />
        ) : (
          <MessageCircle data-testid="open-chat-icon" size={26} />
        )}
      </button>
    </main>
  );
}