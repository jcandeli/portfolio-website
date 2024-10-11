"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Filter</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <Link href="/">All</Link>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <Link href="/photos">Photos</Link>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <Link href="/designs">Designs</Link>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <Link href="/music">Music</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About me</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navigation;
