"use client";

import { ACCESS_TOKEN } from "@/constants";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

// component: SideBar 컴포넌트 //
const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    // event handler: 로그아웃 버튼 핸들러 //
    const logoutHandler = () => {
        deleteCookie(ACCESS_TOKEN);
        router.push("/");
    };

    // render: SideBar 컴포넌트 렌더링 //
    return (
        <aside className="title-font fixed top-0 left-0 h-full w-60 bg-[var(--side-background)] hidden md:flex flex-col text-[rgba(255,245,235,1)] pt-[80px] p-4 z-50">

            <nav className="flex flex-col flex-grow">
                <ul className="space-y-4">
                    <li>
                        <Link
                            href="/main"
                            className={`block px-6 py-3 text-xl font-semibold
                                ${pathname === "/main"
                                    ? "bg-[var(--hover-button)]"
                                    : "hover:bg-[var(--hover-button)]"
                                }`}
                        >
                            Main
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/calendar"
                            className={`block px-6 py-3 text-xl font-semibold
                                ${pathname === "/calendar"
                                    ? "bg-[var(--hover-button)]"
                                    : "hover:bg-[var(--hover-button)]"
                                }`}
                        >
                            Calendar
                        </Link>
                    </li>
                </ul>

                <div className="flex-grow"></div>

                <ul>
                    <li>
                        <button
                            onClick={logoutHandler}
                            className="cursor-pointer p-3 flex items-center justify-center text-[rgba(255,245,235,1)] 
                                hover:bg-[var(--hover-button)] rounded-full ml-auto self-end"
                        >
                            <LogOut size={24} />
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
