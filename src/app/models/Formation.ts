import { Session } from "./Session";
import { SubTheme } from "./SubTheme";

export interface Formation {
    id: number;
    title: string;
    description: string;
    trainingPrice: number;
    logo: string;
    creationDate: Date;
    updateDate: Date;
    subtopics: SubTheme[];
    sessions: Session[];
}