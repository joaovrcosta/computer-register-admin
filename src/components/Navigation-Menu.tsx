import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavigationMenuComponent() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="text-black">
        {/* Item with submenu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white w-full">
            <ul className="p-4">
              <li>
                <NavigationMenuLink href="/option1">
                  Option 1
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/option2">
                  Option 2
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className="px-4 py-2">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/services" className="px-4 py-2">
            Services
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact" className="px-4 py-2">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
