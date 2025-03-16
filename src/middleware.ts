import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

    // accessToken 가져오기
    const token = await req.cookies.get("accessToken")?.value;

    // 접근 제한할 경로 설정
    const publicPaths = ["/", "/sign-up"]; // 로그인한 사용자가 접근하면 안 되는 페이지
    const protectedPaths = ["/main"]; // 로그인하지 않은 사용자가 접근하면 안 되는 페이지

    const isPublicPage = publicPaths.includes(req.nextUrl.pathname);
    const isProtectedPage = protectedPaths.includes(req.nextUrl.pathname);

    // 로그인하지 않은 경우 "/main" 접근 제한
    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // 로그인한 경우 "/","/sign-up" 접근 제한
    if (token && isPublicPage) {
        return NextResponse.redirect(new URL("/main", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)",
    ],
};
