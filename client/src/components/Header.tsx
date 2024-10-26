import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="fixed z-10 top-0 left-0 flex items-center w-full h-16 bg-primary text-primary-foreground shadow-lg">
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto px-4 sm:px-6 gap-1">
        <Link href={"/"} className="font-domine text-2xl">
          WKM
        </Link>
        <nav>
          <Link className="navlink" href={"/pessoa/add"}>
            Adicionar pessoa
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
