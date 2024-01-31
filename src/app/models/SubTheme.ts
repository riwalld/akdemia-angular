import { Theme } from "./Theme";
import { Training } from "./Training";

export interface SubTheme {
    id: number;
    subthemeTitle: string;
    description: string;
    creationDate: Date;
    updateDate: Date;
    trainings: Training[];
    themes: Theme[];
}