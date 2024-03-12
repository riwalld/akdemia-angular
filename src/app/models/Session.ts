import { Formateur } from "./Formateur";
import { Formation } from "./Formation";

export interface Session {
    id: number;
    code: string;
    duration: number;
    price: number;
    description: string;
    status: string;
    date: Date;
    location: string;
    sessionScore: number;
    creationDate: Date;
    updateDate: Date;
    trainer: Formateur;
    training: Formation;
}