import { Session } from "./Session";

export interface InterSession extends Session {
    minParticipant: number;
}