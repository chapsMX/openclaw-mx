"use client";

import { useState } from "react";

export function FAQ() {
  const faqs = [
    {
      question: "¿Qué es OpenClaw?",
      answer:
        "OpenClaw es un asistente IA personal de código abierto que corre en tu propia infraestructura. A diferencia de ChatGPT o Claude, tiene memoria persistente, puede ejecutar tareas, y se conecta a tus servicios favoritos.",
    },
    {
      question: "¿Qué es una VPS?",
      answer:
        "Una VPS (Virtual Private Server) es un servidor privado de alto rendimiento donde vive tu OpenClaw. Garantiza disponibilidad 24/7 y aislamiento para tus flujos de trabajo. Con Managed Hosting, nosotros la administramos por ti.",
    },
    {
      question: "¿Es segura mi data?",
      answer:
        "Absolutamente. OpenClaw corre en tu propia infraestructura (ya sea Self Hosted en tu Mac Mini o en una VPS dedicada). Tus datos nunca pasan por nuestros servidores. Todo permanece bajo tu control.",
    },
    {
      question: "¿Puedo agregar skills adicionales?",
      answer:
        "¡Sí! La instalación básica NO incluye skills, pero estos se pueden agregar en paquetes de 5. Skills disponibles incluyen: Administrador de Emails, Integración con Calendario, Búsqueda Web, Automatización de Tareas, Organizador de Archivos, y más.",
    },
    {
      question: "¿Qué necesito para empezar?",
      answer:
        "Solo necesitas elegir tu plan y completar el cuestionario de configuración. Nosotros nos encargamos del resto. Para Self Hosted, necesitarás tener (o adquirir) una Mac Mini.",
    },
    {
      question: "¿Cuánto tiempo toma la instalación?",
      answer:
        "Para Managed Hosting, tu asistente estará listo en menos de 24 horas. Para Self Hosted, depende de la logística de envío/configuración del hardware, pero típicamente 3-5 días hábiles.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display text-4xl md:text-5xl text-text-primary mb-4">
            FAQ
          </h2>
          <div className="w-24 h-1 bg-accent-primary mx-auto rounded-full" />
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-bg-surface border border-border rounded-xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between font-bold tracking-wide hover:bg-bg-surface-hover transition text-text-primary"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span>{faq.question}</span>
                <span className="text-2xl text-accent-secondary">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-text-secondary border-t border-border pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
