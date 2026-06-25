"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Calendar,
  FileText,
  Home,
  Info,
  LayoutGrid,
  BookOpen,
  Phone,
  Home as HomeIcon,
  Shield,
  Building2,
  TrendingUp,
  RefreshCw,
  Landmark,
  BarChart3,
  FileText as FileTextIcon,
  Key,
  CreditCard,
  Lock,
  Activity,
  PhoneCall,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const loanPrograms = [
  {
    title: "FHA Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/fha-loans",
    description: "Government-backed loans with low down payment requirements.",
    icon: HomeIcon,
  },
  {
    title: "VA Home Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/va-home-loans",
    description:
      "Exclusive benefits for veterans and active-duty service members.",
    icon: Shield,
  },
  {
    title: "Conventional Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/conventional-loans",
    description: "Traditional mortgage options with competitive rates.",
    icon: Building2,
  },
  {
    title: "Jumbo Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/jumbo-loans",
    description: "Financing solutions for high-value properties.",
    icon: TrendingUp,
  },
  {
    title: "Refinance",
    href: "https://billywatkinsmortgage.com/loan-programs/refinance",
    description: "Lower your rate or tap into your home equity.",
    icon: RefreshCw,
  },
  {
    title: "HELOC",
    href: "https://billywatkinsmortgage.com/loan-programs/heloc",
    description: "Flexible home equity line of credit for ongoing needs.",
    icon: Landmark,
  },
  {
    title: "DSCR Investor Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/dscr-investor-loans",
    description: "Qualify based on rental income, not personal income.",
    icon: BarChart3,
  },
  {
    title: "Bank Statement Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/bank-statement-loans",
    description: "Perfect for self-employed borrowers using bank statements.",
    icon: FileTextIcon,
  },
  {
    title: "First-Time Home Buyer",
    href: "https://billywatkinsmortgage.com/loan-programs/first-time-home-buyer",
    description: "Tailored programs and guidance for first-time buyers.",
    icon: Key,
  },
  {
    title: "Debt Consolidation",
    href: "https://billywatkinsmortgage.com/loan-programs/debt-consolidation",
    description: "Simplify payments by combining debts into one loan.",
    icon: CreditCard,
  },
  {
    title: "Fixed-Rate Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/fixed-rate-loans",
    description: "Stable monthly payments with a locked-in interest rate.",
    icon: Lock,
  },
  {
    title: "Adjustable-Rate (ARM) Loans",
    href: "https://billywatkinsmortgage.com/loan-programs/adjustable-rate-loans",
    description: "Start with lower rates that adjust over time.",
    icon: Activity,
  },
];

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/tools", label: "Tools", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Phone },
];

const mobileLoanLinks = loanPrograms.map((p) => ({
  href: p.href,
  label: p.title,
  icon: p.icon,
}));

export function NavigationMenuDemo() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileLoanOpen, setMobileLoanOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="animated-navbar"
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3
        transition-all duration-500 ease-in-out
        ${scrolled ? "bg-[#006132] shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[300px] sm:w-[350px] bg-[#006132] text-white border-white/10 p-0 overflow-y-auto"
          >
            <div className="flex h-20 items-center border-b border-white/10 ">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/img/logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-28 h-20 object-contain"
                  priority
                />
              </Link>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
                >
                  <link.icon className="h-5 w-5 text-text-white" />
                  {link.label}
                </Link>
              ))}

              <div>
                <button
                  onClick={() => setMobileLoanOpen(!mobileLoanOpen)}
                  className="flex items-center justify-between w-full gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <HomeIcon className="h-5 w-5 text-white" />
                    Loan Programs
                  </div>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${mobileLoanOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {mobileLoanOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/20 pl-4">
                    {mobileLoanLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <link.icon className="h-4 w-4 text-white flex-shrink-0" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>
            <div className="lg:hidden flex flex-col w-full items-center gap-3 text-white ">
              <Link
                href="/schedule"
                className="flex gap-2 justify-center w-full px-4"
              >
                <button className="bg-white flex justify-center gap-4 text-[#006132] px-6 w-full py-3 rounded-xl font-semibold transition transform duration-300 hover:-translate-y-1">
                 573-881-5436{" "}
                </button>
                
              </Link>
              <Link href="/" className="w-full px-4">
                <button className="bg-white text-[#006132] px-6 w-full py-3 rounded-xl font-semibold transition transform duration-300 hover:-translate-y-1">
                  Apply Now
                </button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex ">
          <NavigationMenu>
            <NavigationMenuList className="gap-4  ">
              <NavigationMenuItem className="text-white text-lg font-semibold">
             <Link href="/about"> about</Link>  
                <NavigationMenuContent>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem >
                <NavigationMenuTrigger className="text-white text-lg font-semibold ">
                  Loan Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[640px] grid-cols-2 gap-1 p-4 lg:w-[780px] lg:grid-cols-3">
                    {loanPrograms.map((program) => (
                      <li key={program.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={program.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-start gap-3 rounded-lg p-3 text-sm transition-colors hover:bg-[#006132] hover:text-[#006132]-foreground group"
                          >
                            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#006132]/10 text-[#006132] group-hover:bg-[#006132] group-hover:text-[white] transition-colors">
                              <program.icon className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="font-semibold leading-none  text-[#006132]">
                                {program.title}
                              </div>
                              <div className="line-clamp-2 text-xs leading-snug text-[#006132]">
                                {program.description}
                              </div>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border p-4">
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="text-white text-lg font-semibold">
                  <Link href="/https://app.mloflo.com/sl/:BillyWatkins">Apply Now</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden lg:flex items-center gap-3 text-white py-4">
          <Link href="/schedule" className="flex gap-2 justify-center ">
            <PhoneCall />
            <h3>573-881-5436 </h3>
          </Link>
          <Link href="/">
            <button className="bg-white text-[#006132] px-6 py-3 rounded-xl font-semibold transition transform duration-300 hover:-translate-y-1">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm p-3 rounded-md hover:bg-accent transition-colors">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
