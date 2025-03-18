import { NextRequest, NextResponse } from "next/server";

// middleware: 페이지 접근 제어 //
export async function middleware(req: NextRequest) {

    // variable: accessToken 가져오기 //
    const token = await req.cookies.get("accessToken")?.value;

    // variable: 접근 제한할 경로 설정 //
    const publicPaths = ["/", "/sign-up"];
    const protectedPaths = ["/main", "/calendar"];

    // variable: 현재 페이지 상태 확인 //
    const isPublicPage = publicPaths.includes(req.nextUrl.pathname);
    const isProtectedPage = protectedPaths.includes(req.nextUrl.pathname);

    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (token && isPublicPage) {
        return NextResponse.redirect(new URL("/main", req.url));
    }

    return NextResponse.next();
}

// config: 미들웨어가 적용될 경로 설정 //
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)",
    ],
};
