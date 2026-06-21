"use client";
import Hex from "./ui/Hex";
import GloboWireframe from "./ui/GloboWireframe";
import BarcodeDecor from "./ui/BarcodeDecor";

function SocialIcon({ label }: { label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      style={{ color: "#fff", lineHeight: 1, opacity: 0.40, transition: "opacity 150ms ease" }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "0.40")}
    >
      <GloboWireframe size={18} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: "#000",
      borderTop: "0.5px solid var(--border-faint)",
      padding: "56px 24px 40px",
      display: "flex", flexDirection: "column",
      alignItems: "center", textAlign: "center", gap: "20px",
    }}>
      {/* 3 hexágonos decorativos */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <Hex size={20} opacity={0.12} />
        <Hex size={20} opacity={0.30} accent />
        <Hex size={20} opacity={0.12} />
      </div>

      {/* Logo */}
      <span style={{ fontWeight: 800, letterSpacing: "0.14em", fontSize: "16px", color: "#fff", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
        COLMEIA
      </span>

      {/* Ícones sociais */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {/* TODO: substituir hrefs pelos links reais */}
        <SocialIcon label="Instagram" />
        <SocialIcon label="WhatsApp" />
        <SocialIcon label="Link" />
      </div>

      {/* Linha separadora */}
      <div style={{ width: "100%", maxWidth: "480px", height: "0.5px", background: "var(--border-faint)" }} />

      {/* Barcode decorativo */}
      <BarcodeDecor opacity={0.08} />

      {/* Copyright */}
      <p style={{ fontSize: "11px", color: "var(--text-faint)", letterSpacing: "0.06em" }}>
        © 2025 COLMEIA · TODOS OS DIREITOS RESERVADOS
      </p>
      <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.12)" }}>
        Programação sujeita a alterações
      </p>

      {/* Hex decorativo grande */}
      <div style={{ pointerEvents: "none", marginTop: "-10px" }}>
        <Hex size={120} opacity={0.03} />
      </div>
    </footer>
  );
}
