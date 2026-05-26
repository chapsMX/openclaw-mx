"use client";

import { useState } from "react";
import { FadeIn } from '@/components/FadeIn';

export function FAQ() {
  const faqs = [
    {
      question: "¿Qué es OpenClaw?",
      answer:
        "OpenClaw es un agente IA personal de código abierto que corre en tu propia infraestructura. A diferencia de ChatGPT o Claude, tiene memoria persistente, puede ejecutar tareas de forma autónoma y se conecta a tus servicios favoritos como WhatsApp, email y calendario.",
    },
    {
      question: "¿Qué es una VPS?",
      answer:
        "Una VPS (Virtual Private Server) es un servidor privado de alto rendimiento donde vive tu OpenClaw. Garantiza disponibilidad 24/7 y aislamiento total para tus flujos de trabajo. Con Managed Hosting Administrado, nosotros la configuramos y mantenemos por ti — tú solo usas tu asistente.",
    },
    {
      question: "¿Es segura mi data?",
      answer:
        "Absolutamente. OpenClaw corre en tu propia infraestructura (ya sea Self Hosted en tu Mac Mini o en una VPS dedicada). Tus datos nunca pasan por nuestros servidores. Todo permanece bajo tu control total.",
    },
    {
      question: "¿Puedo agregar skills adicionales?",
      answer:
        "¡Sí! La instalación básica no incluye skills, pero se pueden agregar en paquetes de 5. Skills disponibles: Administrador de Emails, Integración con Calendario, Búsqueda Web, Automatización de Tareas, Organizador de Archivos, y más.",
    },
    {
      question: "¿Qué necesito para empezar?",
      answer:
        "Solo necesitas elegir tu plan y completar el cuestionario de configuración. Nosotros nos encargamos del resto. Para Self Hosted, necesitarás tener (o adquirir) una Mac Mini o equipo compatible.",
    },
    {
      question: "¿Cuánto tiempo toma la instalación?",
      answer:
        "Para Managed Hosting, tu asistente estará listo en menos de 24 horas. Para Self Hosted, depende de la logística del hardware, pero típicamente 3–5 días hábiles. En ambos casos recibirás una guía de uso personalizada.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(37,99,235,0.06), transparent)" }}
      />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <p className="text-accent-secondary font-mono text-sm tracking-wider mb-4 opacity-70">
            // PREGUNTAS FRECUENTES
          </p>
          <h2 className="text-display text-4xl md:text-5xl text-text-primary mb-4">
            <span className="gradient-text">FAQ</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent mx-auto" />
        </FadeIn>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 80} direction="up">
            <div
              className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold tracking-wide text-text-primary transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="leading-snug">{faq.question}</span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center text-accent-secondary text-lg transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-white/[0.05] pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
