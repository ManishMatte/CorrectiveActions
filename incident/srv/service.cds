using {idpl} from '../db/schema';

service EmployeeSafetyIncidents {

    entity Incidents  as projection on idpl.Incidents;

    entity Witnesses  as projection on idpl.Witnesses;
    entity MasterData as projection on idpl.MasterData;

    entity CorrectiveActions as projection on idpl.CorrectiveActions;

}