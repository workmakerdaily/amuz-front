import { GetCalendar } from "@/types";
import ResponseDto from "../response.dto";

// interface: Get Calendar Data Response Body Dto //
export default interface GetCalendarDataResponseDto extends ResponseDto{
    calendar : GetCalendar[];
}