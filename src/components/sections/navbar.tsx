"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CTAButton } from "@/components/ui/cta-button";

const LOGIN_LINK = "https://app.zeelo.site/login";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex flex-col ${
        scrolled 
          ? "bg-white/80 backdrop-blur-lg border-b border-white/20" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="bg-primary w-full py-2 px-4 flex justify-center items-center">
        <p className="text-white font-body text-[13px] md:text-[14px] font-medium text-center">
          Crie sua conta <b>GRÁTIS</b> e comece organizar seu enxoval hoje mesmo!{" "}
          <a href="https://app.zeelo.site/register" className="underline font-bold hover:opacity-80 transition-opacity ml-1">
            Criar conta grátis
          </a>
        </p>
      </div>
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-24 xl:px-32 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="" className="flex items-center shrink-0">
          <div className="relative h-8 w-[128px]">
            <Image
              src="/images/logo_hor-brand.png"
              alt="Zeelo"
              fill
              sizes="128px"
              priority
              className="object-contain object-left"
            />
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <button
            onClick={() => scrollTo("como-montar")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Como montar
          </button>
          <button
            onClick={() => scrollTo("lista-enxoval")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Lista de enxoval
          </button>
          <button
            onClick={() => scrollTo("funcionalidades")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Funcionalidades
          </button>
          <button
            onClick={() => scrollTo("preco")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Preço
          </button>
          <button
            onClick={() => scrollTo("duvidas")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Dúvidas
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={LOGIN_LINK}
            className="bg-white h-[44px] px-5 flex items-center justify-center rounded-[4px] border border-border-gold text-[#131413] font-body font-light text-[13.5px] hover:bg-gray-50 transition-colors duration-200"
          >
            Entrar
          </a>
          <CTAButton href="https://app.zeelo.site/register" size="md">
            Criar conta grátis
          </CTAButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-text-dark transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-dark transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-dark transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-border ${
          mobileOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-4 gap-4">
          <button
            onClick={() => scrollTo("como-montar")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Como montar
          </button>
            <button
            onClick={() => scrollTo("lista-enxoval")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Lista de enxoval
          </button>
           <button
            onClick={() => scrollTo("funcionalidades")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Funcionalidades
          </button>
          <button
            onClick={() => scrollTo("preco")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Preço
          </button>
          <button
            onClick={() => scrollTo("duvidas")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Dúvidas
          </button>
          <div className="flex gap-3 pt-2">
            <a
              href={LOGIN_LINK}
              className="flex-1 h-[44px] flex items-center justify-center rounded-[4px] border border-border-gold text-[#131413] font-body font-light text-[13.5px]"
            >
              Entrar
            </a>
            <CTAButton href="https://app.zeelo.site/register" size="md" className="flex-1">
              Criar conta grátis
            </CTAButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
