import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Erro() {
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
        <span style={{ fontSize: "40px" }}>✕</span>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Pagamento não concluído
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", maxWidth: "420px" }}>
          Algo deu errado. Tente novamente ou escolha outra forma de pagamento.
        </p>
        <div style={{ marginTop: "16px" }}>
          <a className="btn-primary" href="/">
            TENTAR NOVAMENTE
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
