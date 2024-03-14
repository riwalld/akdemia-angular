import { Employee } from "./Employee";
import { IntraSession } from "./IntraSession";

export interface EmployeeSouscription {
    id?: number;
	status: string;
	creationDate: Date;
	updateDate: Date;
    intraSession: IntraSession;
    employee: Employee;
}