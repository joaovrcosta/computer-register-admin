import magmaLogo from "@/assets/logo-magma.png";
import { Button } from "./ui/button";
import { NavigationMenuComponent } from "./Navigation-Menu";

export function Header() {
  return (
    <header className="w-full">
      <div className="w-full bg-primary text-white">
        <div className="max-w-[1580px] mx-auto flex items-center justify-between py-2 px-4">
          <p className="text-sm">contato@gmail.com</p>
          <div className="flex gap-4 text-sm">
            <span className="cursor-pointer hover:underline">Entrar</span>
            <span className="cursor-pointer hover:underline">
              Criar uma conta
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="max-w-[1580px] mx-auto py-8 px-4 flex items-center justify-between">
          <div>
            <img src={magmaLogo} alt="Logo da Magma" />
          </div>
          <div>
            <NavigationMenuComponent />
          </div>
          <div>
            <Button className="py-6 px-12 text-sm" variant="primary">
              Testar grátis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
