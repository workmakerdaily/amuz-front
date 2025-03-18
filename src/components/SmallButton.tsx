"use client";

import { ButtonHTMLAttributes } from "react";

// interface: Button 컴포넌트의 Props //
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

// component: Small 버튼 컴포넌트 //
const SmallButton = ({ children, ...props }: Props) => {

    // render: Small 버튼 컴포넌트 렌더링 //
    return (
        <button
            {...props}
            className="w-[80px] h-[40px] text-sm cursor-pointer font-semibold text-white bg-[var(--button)] hover:bg-[var(--hover-button)]"
        >
            {children}
        </button>
    );
}

export default SmallButton;
