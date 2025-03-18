import React, { useState } from 'react';
import { CheckSquare, PencilLine, Save, Square, Trash } from 'lucide-react';
import ButtonInput from './ButtonInput';

// interface: Props //
interface Props {
    label: string;
    isChecked: boolean;
    onChecked: () => void;
    onDelete: () => void;
    onPatch: (newGoal: string) => void;
}

// component: ToDoItem 컴포넌트 //
const ToDoItem = ({ label, isChecked, onChecked, onDelete, onPatch }: Props) => {

    // state: 목표 수정 입력창 표시 여부 //
    const [isPatching, setIsPatching] = useState(false);

    // state: 수정할 목표 값 //
    const [patchValue, setPatchValue] = useState(label);

    // function: 수정 입력창 토글 //
    const patchToggle = () => setIsPatching(!isPatching);

    // event handler: 목표 수정 저장 핸들러 //
    const saveHandler = () => {
        if (!patchValue.trim()) {
            alert("목표를 입력하세요.");
            return;
        }
        onPatch(patchValue);
        setIsPatching(false);
    };

    // event handler: Enter 키 입력 시 목표 추가 핸들러 //
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveHandler();
            setIsPatching(false);
        }
    };

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

                {isPatching ? (
                    <ButtonInput
                        label=""
                        value={patchValue}
                        onChange={(e) => setPatchValue(e.target.value)}
                        onClick={saveHandler}
                        onKeyDown={onKeyDownHandler}
                        autoFocus
                    />
                ) : (
                    <span className={`text-md ${isChecked ? "line-through text-[var(--gray-1)]" : "text-black"}`}>
                        {label}
                    </span>
                )}
            </div>

            <div className="flex gap-2">

                {isPatching ? (
                    <button onClick={saveHandler} className="text-[var(--patch-box)] hover:text-[var(--patch-hover-box)]">
                        <Save size={24} />
                    </button>
                ) : (
                    <button onClick={patchToggle} className="text-[var(--patch-box)] hover:text-[var(--patch-hover-box)]">
                        <PencilLine size={24} />
                    </button>
                )}

                <button onClick={deleteHandler} className="cursor-pointer text-[var(--gray-2)] hover:text-[var(--error)] transition">
                    <Trash size={24} />
                </button>
                </div>
            </div>
            );
};

            export default ToDoItem;
