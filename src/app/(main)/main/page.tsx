"use client";

import Input from "@/components/Input";
import ToDoItem from "@/components/ToDoItem";
import { GetToDo } from "@/types";
import { PlusCircle, XCircle } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import moment from "moment-timezone";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN } from "@/constants";
import { GetToDoListResponseDto } from "@/apis/dto/response/toDo";
import { ResponseDto } from "@/apis/dto/response";
import { deleteToDoRequest, getToDoListRequest, patchIsCheckedRequest, patchToDoPriorityRequest, postToDoRequest } from "@/apis";
import { PatchIsCheckedRequestDto, PostToDoRequestDto } from "@/apis/dto/request/todo";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import SmallButton from "@/components/SmallButton";

// component: MainPage 컴포넌트 //
const MainPage = () => {

    // variable: accessToken //
    const accessToken = getCookie(ACCESS_TOKEN) as string;

    // state: 목표 입력 필드 값 //
    const [goal, setGoal] = useState("");

    // state: 할 일 목록 //
    const [toDoList, setToDoList] = useState<GetToDo[]>([]);

    // state: 할 일 추가 입력창 표시 여부 //
    const [isPostInput, setIsPostInput] = useState(false);

    // state: 검색어 //
    const [searchText, setSearchText] = useState("");

    // function: get to do list response 처리 함수 //
    const getToDoListResponse = (responseBody: GetToDoListResponseDto | ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'VF' ? '목표를 입력하세요.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) { 
            alert(message); 
            return; 
        }

        const toDoList = (responseBody as GetToDoListResponseDto).toDoList || [];
        setToDoList(toDoList);
    };

    // function: post to do response 처리 함수 //
    const postToDoResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'NI' ? '존재하지 않는 유저입니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSucceeded = responseBody !== null && responseBody.code === 'SU';
        if (!isSucceeded) {
            alert(message);
            return;
        }
    }
    // function: patch isChecked response 처리 함수 //
    const patchIsCheckedResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NI' ? '존재하지 않는 유저입니다.' :
            responseBody.code === 'NET' ? '존재하지 않는 목표입니다.' :
            responseBody.code === 'NP' ? '권한이 없습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '수정 완료되었습니다.';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
    }

    // function: patch to do order response 처리 함수 //
    const patchToDoOrederResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NI' ? '존재하지 않는 유저입니다.' :
            responseBody.code === 'NET' ? '존재하지 않는 목표입니다.' :
            responseBody.code === 'NP' ? '권한이 없습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '수정 완료되었습니다.';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
    }

    // function: delete to do response 처리 함수 //
    const deleteToDoResponse = (responseBody: ResponseDto | null) => {
        const message = !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NI' ? '존재하지 않는 유저입니다.' :
            responseBody.code === 'NRP' ? '게시글이 없습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
            
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccessed) {
            alert(message);
            return;
        }
    }

    // event handler: 할 일 추가 핸들러 //
    const onPostButtonClickHandler = async () => {
        if (!goal.trim()) {
            alert('목표를 입력하세요.');
            return;
        }

        const requestBody: PostToDoRequestDto = {
            goal: goal,
        }
        await postToDoRequest(requestBody, accessToken).then(postToDoResponse);
        await getToDoList();
        setIsPostInput(false);
    };

    // event handler: Enter 키 입력 시 목표 추가 핸들러 //
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onPostButtonClickHandler();
            setIsPostInput(false);
        }
    };

    // event handler: goal 입력 변경 핸들러 //
    const onGoalChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setGoal(value);
    }

    // event handler: patch IsChecked 버튼 클릭 이벤트 처리 //
    const onPatchIsCheckedHandler = async (id: number | string, newChecked: boolean) => {
        if (!id) {
            alert("유효한 id가 필요합니다.");
            return;
        }

        const requestBody: PatchIsCheckedRequestDto = {
            isChecked: newChecked,
        }

        await patchIsCheckedRequest(requestBody, id, accessToken).then(patchIsCheckedResponse);
        await getToDoList();
    };

    // event handler: 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteButtonClickHandler = async (id: number | string) => {
        if (!id) {
            alert("유효한 id가 필요합니다.");
            return;
        }

        await deleteToDoRequest(id, accessToken).then(deleteToDoResponse);
        setToDoList((prev) => prev.filter((todo) => todo.id !== id));
    };

    // event handler: drag & drop 핸들러 //
    const dragEndHandler = async (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(toDoList);
        const [rePriorityItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, rePriorityItem);

        setToDoList(items);

        const priorityIds = items.map(todo => todo.id);
        console.log(priorityIds);
        await patchToDoPriorityRequest(priorityIds, accessToken).then(patchToDoOrederResponse);
    }


    // function: to do list 불러오기 함수 //
    const getToDoList = async () => {

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        await getToDoListRequest(accessToken).then(getToDoListResponse);
    };

    // effect: 할 일 목록 불러오기 //
    useEffect(() => {
        getToDoList();
    }, [accessToken]);

    // event handler: 검색어 입력 핸들러 //
    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    // variable: 검색 필터링된 할 일 목록 //
    const todoFilter = toDoList.filter((todo) => todo.goal.toLowerCase().includes(searchText.toLowerCase()));

    // render: MainPage 컴포넌트 렌더링 //
    return (
        <div className="container max-w-screen-md mx-auto px-4 md:px-8 lg:px-6 m-16">

            <div className="title-font text-4xl font-extrabold text-center text-[var(--text)]">What to do?</div>

            <div className="flex items-end justify-between gap-3 mb-6">
                <Input label="검색" placeholder="검색어를 입력하세요." value={searchText} onChange={searchHandler} />
                <div className="flex items-end">

                    {isPostInput &&
                        <div className="flex items-end">
                            <SmallButton onClick={onPostButtonClickHandler}>추가</SmallButton>
                            <Input label="" placeholder="목표를 입력해주세요." onChange={onGoalChangeHandler} onKeyDown={onKeyDownHandler} />
                        </div>
                    }
                    <button className="cursor-pointer bg-[var(--button)] text-white p-3 rounded-full hover:bg-[var(--hover-button)] transition"
                        onClick={() => setIsPostInput(!isPostInput)}>
                        {isPostInput ? <XCircle size={24} /> : <PlusCircle size={24} />}
                    </button>
                </div>
            </div>

            <DragDropContext onDragEnd={dragEndHandler}>
                <Droppable droppableId="toDoList" direction="vertical">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white shadow-md p-4">
                            {todoFilter.length > 0 ? (
                                todoFilter.map((todo, index) => (
                                    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <ToDoItem
                                                    key={todo.id}
                                                    label={todo.goal}
                                                    isChecked={todo.isChecked}
                                                    onChecked={() => onPatchIsCheckedHandler(todo.id, !todo.isChecked)}
                                                    onDelete={() => onDeleteButtonClickHandler(todo.id)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">할 일이 없습니다.</p>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default MainPage;
