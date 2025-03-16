import axios, { AxiosResponse } from "axios";
import { ResponseDto } from "./dto/response";
import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import { SignInResponseDto } from "./dto/response/auth";
import { GetToDoListResponseDto } from "./dto/response/toDo";
import { DELETE_TO_DO_API_URL, GET_TO_DO_LIST_API_URL, ID_CHECK_API_URL, PATCH_IS_CHECKED_API_URL, PATCH_PRIORITY_API_URL, POST_TO_DO_API_URL, SIGN_IN_API_URL, SIGN_UP_API_URL } from "@/constants";
import { PatchIsCheckedRequestDto, PostToDoRequestDto } from "./dto/request/todo";



// function: Authorizarion Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } })

// function: response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
    const { data } = response;
    return data;
};

// function: response error 처리 함수 //
const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};

// function: id check api 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const responseBody = await axios.post(ID_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler)
    return responseBody;
};

// function: sign up 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const responseBody = await axios.post(SIGN_UP_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler)
    return responseBody;
};

// function: sign in 요청 함수 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const responseBody = await axios.post(SIGN_IN_API_URL, requestBody)
        .then(responseDataHandler<SignInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: get to do list 요청 함수 //
export const getToDoListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_TO_DO_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetToDoListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: post to do 요청 함수 //
export const postToDoRequest = async (requestBody: PostToDoRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_TO_DO_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}
// function: patch isChecked 수정 요청 함수 //
export const patchIsCheckedRequest = async (requestBody: PatchIsCheckedRequestDto, id: string | number, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_IS_CHECKED_API_URL(id), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: patch to do priority 수정 요청 함수 //
export const patchToDoPriorityRequest = async (priorityIds: number[], accessToken: string) => {    
    const responseBody = await axios.patch(PATCH_PRIORITY_API_URL,{ priorityIds }, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
        return responseBody;
}

// function: delete to do 삭제 요청 함수 //
export const deleteToDoRequest = async (id: number | string, accessToken: string) => {
    const responseBody = await axios.delete(DELETE_TO_DO_API_URL(id), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}