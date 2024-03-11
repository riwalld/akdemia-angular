import { Requirement } from "./Requirement";

export interface Formation {
    id: number;
    title: string;
    description: string;
    training_price: number;
    logo: string;
    creation_date: Date;
    update_date: Date;
    requirement: Requirement;
}