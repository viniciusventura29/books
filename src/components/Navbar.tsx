import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { data: session } = useSession();
  const [bgNavbar, setBgNavbar] = useState(false);

  const changeBgNavbarColor = () => {
    if (window.scrollY > 800) {
      setBgNavbar(true);
    } else {
      setBgNavbar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", changeBgNavbarColor);
  });

  return (
    <nav
      className={`bg-blue-00 fixed z-50 flex w-full items-center justify-between py-8 px-64 transition-all duration-500`}
    >
      <Link href="/" className="hover:text-purple-900 cursor-pointer text-2xl font-semibold">
        Books
      </Link>
      <div className={`${
        bgNavbar ? "bg-gradient-to-br shadow from-gray-100 to-slate-200 rounded-full" : "bg-transparent"
      } flex items-center gap-16 px-20 py-2 transition-all duration-500`}>
        <Link href="/" className="tracking-wide hover:text-purple-700">
          Home
        </Link>
        <Link href="/books" className="tracking-wide hover:text-purple-700">
          Books
        </Link>
        <Link href="#" className="tracking-wide hover:text-purple-700">
          About
        </Link>
        <div className={`${session ? "hidden" : "flex"} ml-12`}>
          <Link
            href="/login"
            className="rounded bg-purple-700 px-6 py-2 tracking-wide text-white hover:bg-purple-800"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
};
