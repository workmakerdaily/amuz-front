"use client";

import { setCookie } from 'cookies-next';
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { SignInResponseDto } from "@/apis/dto/response/auth";
import { ResponseDto } from "@/apis/dto/response";
import { ACCESS_TOKEN, MAIN_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '@/constants';
import { SignInRequestDto } from '@/apis/dto/request/auth';
import { signInRequest } from '@/apis';

// component: SignInPage 컴포넌트 //
const SignInPage = () => {

  // variable: router //
  const router = useRouter();

  // state: 입력 필드 값 //
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // state: 유효성 메시지 //
  const [userIdMessage, setUserIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // state: 에러 여부 //
  const [userIdMessageError, setUserIdMessageError] = useState(false);
  const [passwordMessageError, setPasswordMessageError] = useState(false);

  // function: 로그인 Response 처리 함수 //
  const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
        responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
        responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SU' ? '로그인 되었습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }

    const { accessToken, expiration } = responseBody as SignInResponseDto;
    const expires = new Date(Date.now() + (expiration * 1000))
    setCookie(ACCESS_TOKEN, accessToken, { path: SIGN_IN_PATH, expires })
    window.location.href = MAIN_PATH;
    alert(message);
  };

  // event handler: userId 입력 핸들러 //
  const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserId(value);
    setUserIdMessage("");
    setUserIdMessageError(false);
  }

  // event handler: userId 미입력 후 포커스 이동 시 에러 메시지 표시 핸들러 //
  const onUserIdBlurHandler = () => {
    if (!userId.trim()) {
      setUserIdMessage("아이디를 입력해주세요.");
      setUserIdMessageError(true);
    }
  };

  // event handler: userId 입력 핸들러 //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordMessage("");
    setPasswordMessageError(false);
  }

  // event handler: userId 미입력 후 포커스 이동 시 에러 메시지 표시 핸들러 //
  const onPasswordBlurHandler = () => {
    if (!password.trim()) {
      setPasswordMessage("비밀번호를 입력해주세요.");
      setPasswordMessageError(true);
    }
  };

  // event handler: 로그인 버튼 클릭 핸들러 //
  const onSignInButtonClickHandler = () => {
    if (!userId || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const requestBody: SignInRequestDto = {
      userId,
      password
    };
    signInRequest(requestBody).then(signInResponse);
  };

    // event handler: Enter 키 입력 시 로그인 버튼 실행 핸들러 //
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSignInButtonClickHandler();
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h2 className="title-font text-2xl font-semibold text-center text-[var(--text)] mb-4">What to do?</h2>
        <div className="space-y-4">
          <div>
            <Input
              label="아이디"
              placeholder="아이디를 입력하세요."
              value={userId}
              onChange={onUserIdChangeHandler}
              onBlur={onUserIdBlurHandler}
              onKeyDown={onKeyDownHandler}
              required
            />
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
          <Button onClick={onSignInButtonClickHandler}>
            로그인
          </Button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          계정이 없으신가요?{" "} <Link href={SIGN_UP_PATH} className="text-[var(--text-link)] hover:underline">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
