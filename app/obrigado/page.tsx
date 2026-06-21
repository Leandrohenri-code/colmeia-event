import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Obrigado() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "calc(100vh - 56px - 160px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          flexDirection: "column",
          textAlign: "center",
          gap: "16px",
        }}
      >
        <span style={{ fontSize: "40px" }}>🎉</span>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Pagamento confirmado
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", maxWidth: "380px" }}>
          Seu ingresso foi garantido. Nos vemos na Colmeia.
        </p>
        <div style={{ marginTop: "16px" }}>
          <a className="btn-secondary" href="/">
            VOLTAR AO INÍCIO
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
