"use client";

import { Github, LucideIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import config from "@/app/config";

const Navbar = () => {
  const items: NavbarItem[] = [
    {
      type: "icon",
      icon: Github,
      href: "https://github.com/xkrishguptaa/pratyush-appreciates",
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <nav className="flex border-b justify-between items-center px-8 h-12">
      <Button variant="link" asChild>
        <Link href="/">
          <h1 className="text-lg font-semibold">{config.name}</h1>
        </Link>
      </Button>
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((link) => {
            switch (link.type) {
              case "link":
                return (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink asChild>
                        <Button variant="link">{link.text}</Button>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              case "dropdown": {
                return (
                  <NavigationMenuItem key={link.text}>
                    <NavigationMenu>
                      <NavigationMenuTrigger
                        className={cn(
                          navigationMenuTriggerStyle(),
                          buttonVariants({
                            variant: "link",
                          })
                        )}
                      >
                        {link.text}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="flex flex-col text-left items-stretch justify-center">
                        {link.links.map((link) => (
                          <Link
                            href={link.href}
                            key={link.href}
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink
                              className={cn("w-full")}
                              asChild
                            >
                              <Button variant="link">{link.text}</Button>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </NavigationMenuContent>
                    </NavigationMenu>
                  </NavigationMenuItem>
                );
              }
              case "icon": {
                return (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink asChild>
                        <Button variant="outline" size="icon">
                          <link.icon size={18} />
                        </Button>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              }
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

interface NavbarLink {
  type: "link";
  href: string;
  text: string;
}

interface NavbarDropdown {
  type: "dropdown";
  text: string;
  links: Omit<NavbarLink, "type">[];
}

interface NavbarIcon {
  type: "icon";
  icon: LucideIcon;
  href: string;
}

type NavbarItem = NavbarLink | NavbarDropdown | NavbarIcon;

export default Navbar;
