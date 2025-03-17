"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants";

// component: Header 컴포넌트 //
const TopBar = () => {

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // event handler: 메뉴 토글 //
    const toggleMenu = () => setIsOpen(!isOpen);

    // event handler: 로그아웃 버튼 핸들러 //
    const logoutHandler = () => {
        deleteCookie(ACCESS_TOKEN);
        router.push("/");
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full md:hidden z-40 p-2 flex justify-between items-center 
                bg-[var(--side-background)] text-[rgba(255,245,235,1)]">

                <button className="p-2 bg-[var(--button)] hover:bg-[var(--hover-button)]"
                    onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <button
                    onClick={logoutHandler}
                    className="cursor-pointer p-3 flex items-center justify-center text-[rgba(255,245,235,1)] 
                                hover:bg-[var(--hover-button)] rounded-full ml-auto self-end"
                >
                    <LogOut size={24} />
                </button>
            </header>

            {isOpen && (
                <nav className="fixed top-[50px] left-0 w-full md:hidden bg-[var(--side-background)] text-[rgba(255,245,235,1)] 
                    p-2 z-30">
                    <ul className="space-y-3">
                        <li>
                            <Link href="/main"
                                className={`title-font flex px-2 pt-2 pb-1 text-sm font-semibold items-center justify-center
                                    ${pathname === "/main" ? "bg-[var(--hover-button)]" : "hover:bg-[var(--hover-button)]"}`}
                                onClick={toggleMenu}>
                                Main
                            </Link>
                        </li>

                    </ul>
                </nav>
            )}
        </>
    );
};

export default TopBar;
