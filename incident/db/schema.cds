namespace idpl;

using {
    cuid,
    managed
} from '@sap/cds/common';

type reported_by_type : String enum {
    Yes;
    No;
}

entity Incidents : cuid, managed {
    reported_only       : reported_by_type;
    incident_date       : Date;
    incident_time       : Time;
    reporter            : String(50);
    contact             : String(20);
    conservation_office : String(50);
    location            : String(50);
    called_in_by        : String(50);
    caller_contact      : String(20);
    caller_ext          : String(4);
    date_time_reported  : DateTime;
    date_reported       : Date;
    time_reported       : Time;
    description         : String;
    weather_conditions  : String(20);
    responders          : Composition of many Responders
                              on responders.incident_id = $self;
    witnesses           : Composition of many Witnesses
                              on witnesses.incident_id = $self;
    personal_injury     : Composition of many PersonalInjuryRecords
                              on personal_injury.incident_id = $self;
    corrective_actions : Composition of many CorrectiveActions
                        on corrective_actions.incident = $self;
}


entity Responders : cuid, managed {
    incident_id   : Association to Incidents;
    agency        : String(100);
    filed         : Boolean;
    report_number : String(20);
    name          : String(100);
}

entity Witnesses : cuid, managed {
    incident_id    : Association to Incidents;
    role           : String(50);
    witness_name   : String(100);
    email          : String(100);
    city           : String(100);
    state          : String(50);
    zip            : String(20);
    contact_number : String(20);
    statement      : String(500);
    taken_by       : String(100);
}

entity PersonalInjuryRecords : cuid, managed {
    incident_id          : Association to one Incidents;
    desc                 : String;
    county               : String;
    zip                  : String;
    start_time           : Time;
    day                  : String;
    shift                : String;
    days_per_week        : Integer;
    job_duties           : String;
    agency               : String;
    med_facility         : String;
    unsafe_action        : String;
    caro_claim           : String;
    caro_injury          : String;
    med_care             : String;
    emp_name             : String;
    supervisor           : String(50);
    sup_email            : String;
    sup_contact          : Decimal(10, 0);
    alt_contact          : Decimal(10, 0);
    sup_notified         : Boolean;
    team_lead_contact    : Decimal(10, 0);
    dob                  : Date;
    gender               : String;
    branch               : String;
    section              : String;
    region               : String;
    hire_date            : Date;
    salaried             : String;
    position_date        : Date;
    months_in_position   : Integer;
    person_type          : String;
    injury_status        : String;
    preventable          : String;
    person_role          : String;
    injured_person_name  : String;
    signature_date_time  : Date;
    injured_person_title : String;
    ppe_items            : Composition of many ProtectiveGear
                               on ppe_items.injury_id = $self;
    body_parts           : Composition of many BodyParts
                               on body_parts.injury_id = $self;
}

entity ProtectiveGear : cuid, managed {
    item_name : String;
    injury_id : Association to PersonalInjuryRecords;
}

entity BodyParts : cuid, managed {
    injury_id : Association to PersonalInjuryRecords;
    part      : String;
    side      : String;
    nature    : String;
}

entity MasterData {
    key id   : Integer;
        text : String;
        type : String;
}

entity Attachments : cuid, managed {
    name        : String;
    type        : String;
    size        : Integer;
    path        : String;
    incident_id : Association to Incidents;
}

entity CorrectiveActions : cuid, managed {
    incident : Association to Incidents;
    name : String(100);
    description : String(100);
    dueDate : Timestamp;
    assignedTo : String(50);
    assignDate : Timestamp;
    status : String(20);
}