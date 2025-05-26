import { CompaniesCarousel } from "@/components/Companies-Coarousel";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="bg-white h-full">
      <Header />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-[1580px] flex flex-col items-center justify-center">
          <motion.h1
            className="text-terciary font-bold text-center text-7xl max-w-[980px] mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Tecnologias Integradas que impulsionam e{" "}
            <span className="text-secondary">aceleram</span> negócios.
          </motion.h1>

          <motion.p
            className="text-terciary text-center max-w-[594px] text-md mt-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            Investimos em inovação para criar ferramentas mais inteligentes em
            uma plataforma integrada que oferece gestão de ativos, pessoas e
            proteção de dados. Facilitamos processos e oferecemos uma visão
            global do seu cenário de tecnologia!
          </motion.p>

          <motion.div
            className="flex gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
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
          </motion.div>
        </div>
      </div>

      <motion.div
        className="w-full flex items-center justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="w-full max-w-[1580px]">
          <CompaniesCarousel />
        </div>
      </motion.div>

      <div className="flex items-center justify-center flex-col mt-20">
        <div className="flex items-center justify-center flex-col w-full">
          <motion.h3
            className="text-terciary text-[42px] font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          >
            <span className="text-primary font-normal">Nós Ouvimos,</span> Você
            Prospera.
          </motion.h3>
          <motion.p
            className="text-blueDark font-semibold max-w-[716px] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          >
            Unimos Pessoas + Soluções tecnológicas e facilitamos processos.
            Desenvolvemos produtos que se adequam a necessidade do seu negócio.
          </motion.p>
        </div>

        <motion.div
          className="uppercase font-bold flex items-center justify-center text-blueDark w-full p-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
        >
          <div className="max-w-[1580px] flex gap-24 p-16">
            <div className="flex items-center justify-center flex-col">
              <CountUp
                start={0}
                end={3600}
                duration={3}
                separator="."
                suffix="+"
                className="text-[50px]"
              />
              <p className="text-primary">Usuários</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <CountUp
                start={0}
                end={500000}
                duration={3}
                separator="."
                suffix="+"
                className="text-[50px]"
              />
              <p className="text-primary">Ativos Gerenciados</p>
            </div>
            <div className="flex items-center justify-center flex-col">
              <CountUp
                start={0}
                end={300}
                duration={3}
                suffix="+"
                className="text-[50px]"
              />
              <p className="text-primary">Clientes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
