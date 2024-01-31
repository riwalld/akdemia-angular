import { ParticularSubscription } from "./ParticularSubscription";
import { Session } from "./Session";

export interface InterSession extends Session{
  minParticipants: number;
  particularSubscriptions: ParticularSubscription[];
}
