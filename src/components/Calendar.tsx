"use client";

import { getCalendarDataRequest } from "@/apis";
import { ResponseDto } from "@/apis/dto/response";
import { ACCESS_TOKEN } from "@/constants";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { GetCalendarDataResponseDto } from "@/apis/dto/response/calendar";
import { GetCalendar } from "@/types";

// interface: 캘린더 이벤트 타입 //
interface CalendarEvent {
    title: string;
    start: string;
}

// component: Calendar 컴포넌트 //
const Calendar = () => {

    // variable: accessToken //
    const accessToken = getCookie(ACCESS_TOKEN) as string;

    // state: 캘린더 데이터 //
    const [calendarData, setCalendarData] = useState<GetCalendar[]>([]);

    // state: FullCalendar 이벤트 데이터 //
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    // function: 캘린더 데이터 Response 처리 함수 //
    const getCalendarDataResponse = (responseBody: GetCalendarDataResponseDto | ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'NED' ? '데이터가 존재하지 않습니다.' :
            responseBody.code === 'NP' ? '권한이 없습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        
        if (!isSuccessed) { 
            alert(message);
            return;
        }
        const calendarData = (responseBody as GetCalendarDataResponseDto).calendar || [];
        setCalendarData(calendarData);

        // variable: FullCalendar 이벤트 데이터 변환 //
        const formattedEvents = calendarData.map((item) => ({
            title: item.goal,
            start: item.completedDate,
        }));
        setEvents(formattedEvents);
    }

    // function: 캘린더 데이터 요청 //
    const getCalendarData = async () => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        await getCalendarDataRequest(accessToken).then(getCalendarDataResponse);
    };

    // effect: 캘린더 데이터 불러오기 //
    useEffect(() => {
        getCalendarData();
    }, [accessToken]);

    // render: Calendar 컴포넌트 렌더링 //
    return (
        <div className="w-full max-w-4xl mx-auto p-4">

                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="auto"
                />
        </div>
    );
};

export default Calendar;
