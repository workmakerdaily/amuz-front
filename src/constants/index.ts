// variable: 상대 경로 상수 //
export const SIGN_IN_PATH = "/";
export const SIGN_UP_PATH = "/sign-up";
export const MAIN_PATH = "/main";


// variable: API 도메인 및 모듈 경로 //
export const WHAT_TO_DO_DOMAIN = "http://localhost:4000"

// variable: API 모듈 경로 //
export const AUTH_MODULE_URL = `${WHAT_TO_DO_DOMAIN}/api/v1/auth`;
export const MAIN_MODULE_URL = `${WHAT_TO_DO_DOMAIN}/api/v1/todo`;
export const CALENDAR_MODULE_URL = `${WHAT_TO_DO_DOMAIN}/api/v1/calendar`;

// variable: 인증 관련 API //
export const ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check`;
export const SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up`;
export const SIGN_IN_API_URL = `${AUTH_MODULE_URL}/sign-in`;

// variable: 목표 관련 API //
export const GET_TO_DO_LIST_API_URL = `${MAIN_MODULE_URL}`;
export const POST_TO_DO_API_URL = `${MAIN_MODULE_URL}`;
export const PATCH_IS_CHECKED_API_URL = ( id: number | string ) => `${MAIN_MODULE_URL}/is-check/${id}`;
export const PATCH_PRIORITY_API_URL = `${MAIN_MODULE_URL}/priority`;
export const DELETE_TO_DO_API_URL = ( id: number | string ) => `${MAIN_MODULE_URL}/${id}`;

// variable: 캘린더 관련 API //
export const GET_CALENDAR_DATA_API_URL = `${CALENDAR_MODULE_URL}`;


// variable: HTTP BEARER TOKEN COOKIE NAME //
export const ACCESS_TOKEN = 'accessToken';