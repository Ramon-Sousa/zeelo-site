"use client";

import { useCallback } from "react";
import Image from "next/image";

export function Footer() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <footer className="bg-primary">
      {/* Top bar */}
      <div className="border-b border-primary-light/20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body font-light text-primary-light text-sm">
            ©2026 Zeelo
          </p>

          <div className="flex items-center flex-wrap justify-center gap-4 md:gap-6">
            <button
              onClick={() => scrollTo("lista-enxoval")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Lista de enxoval
            </button>
            <button
              onClick={() => scrollTo("como-montar")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Como montar
            </button>
            <button
              onClick={() => scrollTo("preco")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Preço
            </button>
            <button
              onClick={() => scrollTo("duvidas")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Dúvidas
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/zeelo.enxoval/"
              target="blank"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity duration-200"
              aria-label="Instagram"
            >
              <Image
                src="/images/social-1.svg"
                alt="Instagram"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>
            <a
              href="https://www.tiktok.com/@zeelo.enxoval"
              target="blank"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity duration-200"
              aria-label="Tiktok"
            >
              <Image
                src="/images/social-2.svg"
                alt="Tiktok"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Big Logo */}
      <div className="flex items-center justify-center py-12 md:py-20 px-5 overflow-hidden">
        <div className="flex items-center gap-4 md:gap-8">
        </div>
      </div>
    </footer>
  );
}
