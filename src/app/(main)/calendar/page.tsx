"use client";

import Calendar from "@/components/Calendar";

// component: CalendarPage 컴포넌트 //
const CalendarPage = () => {

    // render: CalendarPage 컴포넌트 렌더링 //
    return (
        <div className="container max-w-screen-md mx-auto px-4 md:px-8 lg:px-6 m-16">
            <Calendar />
        </div>
    );

}

export default CalendarPage;