import { GetToDo } from "@/types";
import ResponseDto from "../response.dto";

// interface: Get To Do List Response Body Dto //
export default interface GetToDoListResponseDto extends ResponseDto{
    toDoList : GetToDo[];
}