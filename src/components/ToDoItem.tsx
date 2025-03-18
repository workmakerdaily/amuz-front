import React, { useState } from 'react';
import { CheckSquare, Square, Trash } from 'lucide-react';

// interface: Props //
interface Props {
    label: string;
    isChecked: boolean;
    onChecked: () => void;
    onDelete: () => void;
}

// component: ToDoItem 컴포넌트 //
const ToDoItem = ({ label, isChecked, onChecked, onDelete }: Props) => {

    // event handler: 삭제 버튼 클릭 핸들러 //
    const deleteHandler = () => {
        const deleteAlert = window.confirm('정말 삭제하시겠습니까?');
        if (deleteAlert) {
            onDelete();
        }
    };

    // render: ToDoItem 컴포넌트 렌더링 //
    return (
        <div className="flex items-center justify-between border-b border-[var(--gray-1)] hover:border-[var(--gray-2)] bg-white p-4">
            <div className="flex items-center gap-3">

                <button onClick={onChecked} className="cursor-pointer text-[var(--check-box)] hover:text-[var(--check-box)] transition">
                    {isChecked ? <CheckSquare size={24} /> : <Square size={24} />}
                </button>

                <span className={`text-md ${isChecked ? 'line-through text-[var(--gray-1)]' : 'text-[var(--text)]'}`}>
                    {label}
                </span>
            </div>

            <button onClick={deleteHandler} className="cursor-pointer text-[var(--gray-2)] hover:text-red-500 transition">
                <Trash size={24} />
            </button>
        </div>
    );
};

export default ToDoItem;
