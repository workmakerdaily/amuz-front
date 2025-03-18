import { SignInUser } from "@/types";
import { create } from "zustand";

// interface: 상태 관리 타입 정의 //
interface SignInUserStore {
    signInUser: SignInUser | null;
    setSignInUser: (signInUser: SignInUser | null) => void;
}

// store: Zustand 상태 관리 //
const useStore = create<SignInUserStore>(set => ({
    signInUser: null,
    // function: 로그인한 사용자 정보 설정 //
    setSignInUser: (signInUser: SignInUser | null) => set(state => ({...state, signInUser}))
}));

export default useStore;