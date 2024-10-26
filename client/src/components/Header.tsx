import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="flex items-center w-full h-16 bg-primary text-primary-foreground overflow-hidden">
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto px-4 sm:px-6 gap-1">
        <Link href={"/"} className="font-domine text-2xl">WKM</Link>
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
