"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { ResponseDto } from "@/apis/dto/response";
import { IdCheckRequestDto, SignUpRequestDto } from "@/apis/dto/request/auth";
import { idCheckRequest, signUpRequest } from "@/apis";
import SmallButton from "@/components/SmallButton";
import ButtonInput from "@/components/ButtonInput";
import { SIGN_IN_PATH } from "@/constants";

// component: SignUpPage 컴포넌트 //
const SignUpPage = () => {

    // variable: router //
    const router = useRouter();

    // state: 입력 필드 값 //
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // state: 유효성 메시지 //
    const [userIdMessage, setUserIdMessage] = useState<string>('');
    const [userNameMessage, setUserNameMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('');

    // state: 에러 여부 //
    const [userIdMessageError, setUserIdMessageError] = useState<boolean>(false);
    const [userNameMessageError, setUserNameMessageError] = useState<boolean>(false);
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordConfirmMessageError, setPasswordConfirmMessageError] = useState<boolean>(false);

    // state: 인증 상태 //
    const [isCheckedUserId, setCheckedUserId] = useState<boolean>(false);
    const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
    const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);

    // variable: 회원가입 가능 여부 //
    const isComplete = userId && isCheckedUserId && userName && password && passwordConfirm;

    // function: 아이디 중복 체크 Response 처리 함수 //
    const idCheckResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'SU' ? '사용 가능한 아이디입니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setUserIdMessage(message);
        setUserIdMessageError(!isSuccessed);
        setCheckedUserId(isSuccessed);

    }

    // function: 회원가입 Response 처리 함수 //
    const signUpResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'SU' ? '가입이 완료되었습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (isSuccessed) {
            alert(message);
            return;
        }

    }

    // event handler: 아이디 중복 확인 버튼 클릭 핸들러 //
    const onIdCheckClickHandler = () => {
        if (!userId) return;

        const requestBody: IdCheckRequestDto = {
            userId
        };
        console.log("요청 데이터:", requestBody);

        idCheckRequest(requestBody).then(idCheckResponse);
    }

    // event handler: 회원가입 버튼 클릭 핸들러 //
    const onSignUpButtonClickHandler = () => {

        if (!isComplete) {
            alert("항목 기입과 인증 완료하세요.")
            return;
        }

        const requestBody: SignUpRequestDto = {
            userId,
            userName,
            password,
        }

        signUpRequest(requestBody).then(signUpResponse);

        router.push(SIGN_IN_PATH);
    }

    // event handler: userName 입력 핸들러 //
    const onUserNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserName(value);
        setUserNameMessage('');
        setUserNameMessageError(false);
    }

    // event handler: userName 미입력 후 포커스 이동 시 에러 메시지 표시 핸들러 //
    const onUserNameBlurHandler = () => {
        if (!userName.trim()) {
            setUserNameMessage("이름을 입력해주세요.");
            setUserNameMessageError(true);
        }
    };

    // event handler: userId 입력 핸들러 //
    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserId(value);
        setCheckedUserId(false);
        setUserIdMessage('');
    }

    // event handler: userId 미입력 후 포커스 이동 시 에러 메시지 표시 핸들러 //
    const onUserIdBlurHandler = () => {
        if (!userId.trim()) {
            setUserIdMessage("아이디를 입력해주세요.");
            setUserIdMessageError(true);
        }
    };

    // event handler: password 입력 핸들러 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        const isMatched = pattern.test(value);

        const message = (isMatched || !value) ? '' : '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.';
        setPasswordMessage(message);
        setPasswordMessageError(!isMatched);
        setMatchedPassword(isMatched);
    }

    // event handler: password 미입력 후 포커스 이동 시 에러 메시지 표시 핸들러 //
    const onPasswordBlurHandler = () => {
        if (!password.trim()) {
            setPasswordMessage("비밀번호를 입력해주세요.");
            setPasswordMessageError(true);
        }
    };

    // event handler: passwordConfirm 입력 핸들러 //
    const onPasswordConfirmChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordConfirm(value);
    }

    // event handler: passwordConfirm 미입력 후 포커스 이동 시 에러 메시지 표시 핸들러 //
    const onPasswordConfirmBlurHandler = () => {
        if (!password.trim()) {
            setPasswordConfirmMessage("비밀번호 확인을 입력해주세요.");
            setPasswordConfirmMessageError(true);
        }
    };

    // event handler: Enter 키 입력 시 로그인 버튼 실행 핸들러 //
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSignUpButtonClickHandler();
        }
    };

    // effect:비밀번호 및 비밀번호 확인 변경시 이펙트 //
    useEffect(() => {
        if (!password || !passwordConfirm) return;

        const isEqual = password === passwordConfirm;
        const message = isEqual ? '' : '비밀번호가 일치하지 않습니다.';
        setPasswordConfirmMessage(message);
        setPasswordConfirmMessageError(!isEqual);
        setCheckedPassword(isEqual);
    }, [password, passwordConfirm]);

    // render: signUpPage component 렌더링 //
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-6">
                <h2 className="title-font text-2xl font-semibold text-center text-[var(--text)] mb-4">What to do?</h2>
                <div className="space-y-4">
                    <div>
                        <Input
                            label="이름"
                            placeholder="이름을 입력하세요."
                            value={userName}
                            onChange={onUserNameChangeHandler}
                            onBlur={onUserNameBlurHandler}
                            onKeyDown={onKeyDownHandler}
                            required
                        />
                        {userNameMessage && (
                            <p className={`text-xs mt-1 ${userNameMessageError ? "text-[var(--error)]" : "text-[var(--clear)]"}`}>
                                {userNameMessage}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-end justify-between border-b border-[var(--input)] hover:border-[var(--focus-input)] 
                    focus:border-[var(--focus-input)]">
                            <ButtonInput
                                label="아이디"
                                placeholder="아이디를 입력하세요."
                                value={userId}
                                onChange={onUserIdChangeHandler}
                                onBlur={onUserIdBlurHandler}
                                onKeyDown={onKeyDownHandler}
                                required
                            />
                            <SmallButton onClick={onIdCheckClickHandler}>중복확인</SmallButton>
                        </div>

                        {userIdMessage && (
                            <p className={`text-xs mt-1 ${userIdMessageError ? "text-[var(--error)]" : "text-[var(--clear)]"}`}>
                                {userIdMessage}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="비밀번호"
                            placeholder="비밀번호를 입력하세요."
                            type="password"
                            value={password}
                            onChange={onPasswordChangeHandler}
                            onBlur={onPasswordBlurHandler}
                            onKeyDown={onKeyDownHandler}
                            required
                        />
                        {passwordMessage && (
                            <p className={`text-xs mt-1 ${passwordMessageError ? "text-[var(--error)]" : "text-[var(--clear)]"}`}>
                                {passwordMessage}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="비밀번호 확인"
                            placeholder="동일한 비밀번호를 입력하세요."
                            type="password"
                            value={passwordConfirm}
                            onChange={onPasswordConfirmChangeHandler}
                            onBlur={onPasswordConfirmBlurHandler}
                            onKeyDown={onKeyDownHandler}
                            required
                        />
                        {passwordConfirmMessage && (
                            <p className={`text-xs mt-1 ${passwordConfirmMessageError ? "text-[var(--error)]" : "text-[var(--clear)]"}`}>
                                {passwordConfirmMessage}
                            </p>
                        )}
                    </div>

                    <Button onClick={onSignUpButtonClickHandler}>
                        회원가입
                    </Button>
                </div>
                <p className="mt-4 text-sm text-center text-gray-600">
                    이미 계정이 있으신가요?{" "} <Link href={SIGN_IN_PATH} className="text-[var(--text-link)] hover:underline">로그인</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
