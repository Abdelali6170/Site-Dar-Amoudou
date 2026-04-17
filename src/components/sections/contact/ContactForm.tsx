"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  suite: string;
  arrivee: string;
  depart: string;
  voyageurs: string;
  message: string;
  objet: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

// ─── Composant champ ─────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs tracking-[0.18em] uppercase"
        style={{
          color: "#A3895D",
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#EA580C", marginLeft: "3px" }}>*</span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Styles partagés ─────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "0.875rem",
  color: "#1A1A1A",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(26,26,26,0.2)",
  borderRadius: 0,
  outline: "none",
  padding: "0.6rem 0",
  width: "100%",
  transition: "border-color 0.3s",
};

// ─── Composant principal ──────────────────────────────────────────────────────

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    suite: "",
    arrivee: "",
    depart: "",
    voyageurs: "2",
    message: "",
    objet: "reservation",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulation d'envoi — à remplacer par un appel API réel
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // Pour la démo : succès systématique
    setStatus("success");
  };

  const getInputStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderBottomColor:
      focusedField === name
        ? "#EA580C"
        : "rgba(26,26,26,0.2)",
  });

  const fieldProps = (name: string) => ({
    style: getInputStyle(name),
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
    onChange: handleChange,
  });

  // ── État succès ──────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center text-center px-10 py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Check animé */}
        <motion.div
          className="mb-8 flex items-center justify-center"
          style={{
            width: "64px",
            height: "64px",
            border: "1px solid rgba(26,26,26,0.15)",
            borderRadius: "50%",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12l6 6L20 6"
              stroke="#EA580C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 300,
            color: "#1A1A1A",
            marginBottom: "1rem",
          }}
        >
          Message envoyé
        </h2>

        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.875rem",
            color: "rgba(26,26,26,0.6)",
            lineHeight: 1.8,
            maxWidth: "380px",
          }}
        >
          Notre équipe vous répondra dans les 24 heures. Nous nous réjouissons
          de vous accueillir à Dar Amoudou.
        </p>

        <button
          onClick={() => {
            setStatus("idle");
            setForm({
              prenom: "", nom: "", email: "", telephone: "",
              suite: "", arrivee: "", depart: "", voyageurs: "2",
              message: "", objet: "reservation",
            });
          }}
          className="mt-10 text-xs tracking-[0.2em] uppercase underline underline-offset-4 transition-opacity hover:opacity-50"
          style={{ color: "rgba(26,26,26,0.5)", fontFamily: "var(--font-inter), sans-serif" }}
        >
          Nouveau message
        </button>
      </motion.div>
    );
  }

  // ── Formulaire ───────────────────────────────────────────────────────────

  return (
    <motion.div
      className="px-8 py-14 md:px-14"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderRight: "1px solid rgba(26,26,26,0.08)" }}
    >
      {/* En-tête */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: "24px", height: "1px", backgroundColor: "#EA580C" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "#EA580C", fontFamily: "var(--font-inter), sans-serif" }}
          >
            Votre demande
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
            fontWeight: 300,
            color: "#1A1A1A",
            lineHeight: 1.15,
          }}
        >
          Écrivez-nous
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* Objet */}
        <Field label="Objet" required>
          <div className="flex gap-4 mt-1">
            {[
              { value: "reservation", label: "Réservation" },
              { value: "renseignement", label: "Renseignement" },
              { value: "evenement", label: "Événement privé" },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="objet"
                  value={opt.value}
                  checked={form.objet === opt.value}
                  onChange={handleChange}
                  className="accent-orange-600"
                />
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.8rem",
                    color: form.objet === opt.value ? "#1A1A1A" : "rgba(26,26,26,0.5)",
                    transition: "color 0.2s",
                  }}
                >
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </Field>

        {/* Prénom / Nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Prénom" required>
            <input
              type="text"
              name="prenom"
              value={form.prenom}
              required
              autoComplete="given-name"
              {...fieldProps("prenom")}
            />
          </Field>
          <Field label="Nom" required>
            <input
              type="text"
              name="nom"
              value={form.nom}
              required
              autoComplete="family-name"
              {...fieldProps("nom")}
            />
          </Field>
        </div>

        {/* Email / Téléphone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Email" required>
            <input
              type="email"
              name="email"
              value={form.email}
              required
              autoComplete="email"
              {...fieldProps("email")}
            />
          </Field>
          <Field label="Téléphone">
            <input
              type="tel"
              name="telephone"
              value={form.telephone}
              autoComplete="tel"
              {...fieldProps("telephone")}
            />
          </Field>
        </div>

        {/* Suite souhaitée — visible si réservation */}
        <AnimatePresence>
          {form.objet === "reservation" && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Field label="Suite souhaitée">
                <select
                  name="suite"
                  value={form.suite}
                  style={{
                    ...getInputStyle("suite"),
                    appearance: "none",
                    cursor: "pointer",
                  }}
                  onFocus={() => setFocusedField("suite")}
                  onBlur={() => setFocusedField(null)}
                  onChange={handleChange}
                >
                  <option value="">Au choix</option>
                  <option value="suite-nomade">Suite Nomade</option>
                  <option value="suite-berbere">Suite Berbère</option>
                  <option value="suite-atlas">Suite Atlas</option>
                </select>
              </Field>

              <Field label="Arrivée" required={form.objet === "reservation"}>
                <input
                  type="date"
                  name="arrivee"
                  value={form.arrivee}
                  required={form.objet === "reservation"}
                  {...fieldProps("arrivee")}
                />
              </Field>

              <Field label="Départ" required={form.objet === "reservation"}>
                <input
                  type="date"
                  name="depart"
                  value={form.depart}
                  required={form.objet === "reservation"}
                  {...fieldProps("depart")}
                />
              </Field>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voyageurs */}
        {form.objet === "reservation" && (
          <Field label="Nombre de voyageurs">
            <div className="flex gap-3 mt-1">
              {["1", "2", "3", "4"].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setForm((prev) => ({ ...prev, voyageurs: n }))}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: `1px solid ${form.voyageurs === n ? "#1A1A1A" : "rgba(26,26,26,0.2)"}`,
                    backgroundColor: form.voyageurs === n ? "#1A1A1A" : "transparent",
                    color: form.voyageurs === n ? "#FDFBF7" : "rgba(26,26,26,0.6)",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderRadius: "2px",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </Field>
        )}

        {/* Message */}
        <Field label="Message">
          <textarea
            name="message"
            value={form.message}
            rows={5}
            placeholder="Vos souhaits, questions, occasions particulières…"
            style={{
              ...getInputStyle("message"),
              resize: "none",
              borderBottom: "none",
              border: `1px solid ${focusedField === "message" ? "#EA580C" : "rgba(26,26,26,0.15)"}`,
              padding: "0.75rem",
              marginTop: "0.25rem",
              transition: "border-color 0.3s",
            }}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
          />
        </Field>

        {/* Mention RGPD */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.72rem",
            color: "rgba(26,26,26,0.4)",
            lineHeight: 1.6,
          }}
        >
          Vos données sont utilisées uniquement pour traiter votre demande et ne
          sont jamais transmises à des tiers.
        </p>

        {/* Bouton envoi */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative flex items-center justify-center gap-3 py-4 px-8 overflow-hidden self-start"
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "2px",
            border: "none",
            cursor: status === "loading" ? "wait" : "pointer",
            minWidth: "200px",
          }}
        >
          <span
            className="absolute inset-0 origin-left transition-transform duration-500 ease-out"
            style={{
              backgroundColor: "#EA580C",
              transform: status === "loading" ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
            }}
          />
          <span
            className="relative text-xs tracking-[0.25em] uppercase"
            style={{ color: "#FDFBF7", fontFamily: "var(--font-inter), sans-serif" }}
          >
            {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
          </span>
          {status !== "loading" && (
            <svg
              className="relative transition-transform duration-300 group-hover:translate-x-1"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1 6h10M6 1l5 5-5 5"
                stroke="#FDFBF7"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </form>
    </motion.div>
  );
}
