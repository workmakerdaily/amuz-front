import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="ko">
            <body>
                <SideBar />
                <div className="flex flex-col w-full">
                    <TopBar />
                    <main className="flex-1 p-6 pt-[40px] md:pt-0 pl-0 pr-0 md:pr-4 md:pl-[260px]">{children}</main>
                </div>
            </body>
        </html>
    );
}