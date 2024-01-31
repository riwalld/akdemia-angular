import { Employee } from "./Employee";

export interface Company {
    id: number;
    activity: string;
    name: string;
    employees: Employee[];
} 