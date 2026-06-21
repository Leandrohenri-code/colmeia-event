import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Lineup from "@/components/Lineup";
import Ingressos from "@/components/Ingressos";
import Alimentacao from "@/components/Alimentacao";
import Lancamento from "@/components/Lancamento";
import AfterParty from "@/components/AfterParty";
import Footer from "@/components/Footer";
import HalftoneSeparator from "@/components/ui/HalftoneSeparator";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Lineup />
        <HalftoneSeparator />
        <Ingressos />
        <Alimentacao />
        <Lancamento />
        <AfterParty />
      </main>
      <Footer />
    </>
  );
}
