"use client";

import { InputHTMLAttributes } from "react";

// interface: Input 컴포넌트의 Props //
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

// component: Input 컴포넌트 //
const Input = ({ label, ...props }: Props) => {

    // render: Input 컴포넌트 렌더링 //
    return (
        <div>
            <label className="block text-xs">{label}</label>
            <input
                {...props}
                className="w-full mt-2 p-2 text-sm border-b outline-none 
                    border-[var(--input)] hover:border-[var(--focus-input)] 
                    focus:border-[var(--focus-input)] placeholder:text-sm"
            />
        </div>
    );
}

export default Input;