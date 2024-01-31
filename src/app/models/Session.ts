import { Manager } from "./Manager";
import { Trainer } from "./Trainer";
import { Training } from "./Training";

export interface Session{
  id:                    number;
  code:                  string;
  duration:              number;
  description:           string;
  price:                 number;
  status:                string;
  date:                  Date;
  location:              string;
  sessionScore:          number;
  creationDate:          Date;
  updateDate:            Date;
  manager:               Manager;
  trainer:               Trainer;
  training:              Training;
}