"use client";

import { ButtonHTMLAttributes } from "react";

// interface: Button 컴포넌트의 Props //
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

// component: 버튼 컴포넌트 //
const Button = ({ children, ...props }: Props) => {

    // render: 버튼 컴포넌트 렌더링 //
    return (
        <button
            {...props}
            className="w-full px-6 py-3 text-lg cursor-pointer font-semibold text-white bg-[var(--button)] hover:bg-[var(--hover-button)]"
        >
            {children}
        </button>
    );
}

export default Button;
