import { Company } from "./Company";
import { EmployeeSubscription } from "./EmployeeSubscription";
import { Session } from "./Session";

export interface IntraSession extends Session{
  company: Company;
  employeeSubscriptions: EmployeeSubscription[];
}
