"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants";

// component: Header 컴포넌트 //
const TopBar = () => {

    // variable: router //
    const router = useRouter();

    // variable: 현재 경로 //
    const pathname = usePathname();

    // state: 메뉴 토글 상태 //
    const [isOpen, setIsOpen] = useState(false);

    // event handler: 메뉴 토글 //
    const toggleMenu = () => setIsOpen(!isOpen);

    // event handler: 로그아웃 버튼 핸들러 //
    const logoutHandler = () => {
        deleteCookie(ACCESS_TOKEN);
        router.push("/");
    };

    // render: Header 컴포넌트 렌더링 //
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
                    <ul className="flex flex-row items-baseline justify-around w-full">

                        <li>
                            <Link href="/main"
                                className={`title-font h-[40px] pb-1 flex items-center justify-center text-sm font-semibold 
            px-4 py-2 transition-colors duration-200
            ${pathname === "/main" ? "bg-[var(--hover-button)]" : "hover:bg-[var(--hover-button)]"}`}
                                onClick={toggleMenu}>
                                Main
                            </Link>
                        </li>

                        <li>
                            <Link href="/calendar"
                                className={`title-font h-[40px] pb-1 flex items-center justify-center text-sm font-semibold 
            px-4 py-2 transition-colors duration-200
            ${pathname === "/calendar" ? "bg-[var(--hover-button)]" : "hover:bg-[var(--hover-button)]"}`}
                                onClick={toggleMenu}>
                                Calendar
                            </Link>
                        </li>

                    </ul>
                </nav>
            )}
        </>
    );
};

export default TopBar;
