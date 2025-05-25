import { CompaniesCarousel } from "@/components/Companies-Coarousel";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-white h-full">
      <Header />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-[1580px] flex flex-col items-center justify-center">
          <h1 className="text-terciary font-bold text-center text-7xl max-w-[980px] mt-12">
            Tecnologias Integradas que impulsionam e{" "}
            <span className="text-secondary">aceleram</span> negócios.
          </h1>
          <p className="text-terciary text-center max-w-[594px] text-md mt-6">
            Investimos em inovação para criar ferramentas mais inteligentes em
            uma plataforma integrada que oferece gestão de ativos, pessoas e
            proteção de dados. Facilitamos processos e oferecemos uma visão
            global do seu cenário de tecnologia!
          </p>
          <div className="flex gap-4 mt-6">
            <Link to="/dashboard">
              <Button variant="callToAction" className="px-8 py-6 font-bold">
                Testar Grátis
              </Button>
            </Link>
            <Button
              variant="callToAction"
              className="px-8 py-6 text-primary bg-white border border-primary"
            >
              Como funciona?
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-6">
        <div className="w-full max-w-[1580px]">
          <CompaniesCarousel />
        </div>
      </div>
    </div>
  );
}
