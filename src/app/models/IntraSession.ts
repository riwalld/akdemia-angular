import { EmployeeSubscription } from "./EmployeeSubscription";
import { Session } from "./Session";

export interface IntraSession extends Session{
  employeeSubscriptions: EmployeeSubscription[];
}
