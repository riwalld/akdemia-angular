import { InterSession } from "./InterSession";
import { Particular } from "./Particular";

export interface ParticularSouscription {
    id?: number;
	status: string;
	creationDate: Date;
	updateDate: Date;
    interSession: InterSession;
    particular: Particular;
}