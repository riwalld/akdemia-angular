import { Company } from "./Company";
import { Session } from "./Session";

export interface IntraSession extends Session {
    company: Company;
}