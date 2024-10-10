import { lectureHandlers } from "./lecture";
import { userHandlers } from "./user";

const handlers = [...userHandlers, ...lectureHandlers];

export default handlers;
