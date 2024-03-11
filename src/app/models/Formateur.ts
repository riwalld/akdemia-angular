import { Requirement } from "./Requirement";
import { User } from "./User";

export interface Formateur extends User {
    id: number;
    activity: string;
    cv_link: string;
    firstname: string;
    lastname: string;
    gender: string;
    requirement: Requirement;
}