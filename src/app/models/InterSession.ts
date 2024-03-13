import { Session } from "./Session";

export interface InterSession extends Session {
    minParticipants: number;
}