import { Requirement } from "./Requirement";

export interface Formation {
    id: number;
    title: string;
    description: string;
    training_price: number;
    logo: string;
    creationDate: Date;
    updateDate: Date;
    requirement: Requirement;
}