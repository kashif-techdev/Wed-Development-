CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    specialization VARCHAR(50)
);

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    doctor_id INT REFERENCES doctors(doctor_id),
    status VARCHAR(20) CHECK (status IN ('BOOKED','COMPLETED','CANCELLED'))
);

CREATE TABLE hospital_payments (
    payment_id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointments(appointment_id),
    amount NUMERIC(10,2),
    payment_status VARCHAR(20) CHECK (payment_status IN ('SUCCESS','FAILED'))
);

CREATE TABLE emergency_cases (
    case_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    status VARCHAR(20) CHECK (status IN ('TREATED','DEAD','TRANSFERRED'))
);

CREATE TABLE ipd_cases (
    ipd_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    status VARCHAR(20) CHECK (status IN ('ADMITTED','DISCHARGED'))
);



INSERT INTO patients (name) VALUES ('Ali'),('Ahmed'),('Bilal');
INSERT INTO doctors (name, specialization)
VALUES ('Dr Khan','Cardio'),('Dr Sara','Neuro');


--1. Normal Appointment (Success Flow)
BEGIN;
SELECT pg_current_wal_lsn();

INSERT INTO appointments (patient_id, doctor_id, status)
VALUES (1,1,'BOOKED');

INSERT INTO hospital_payments (appointment_id, amount, payment_status)
VALUES (currval('appointments_appointment_id_seq'), 2000,'SUCCESS');

UPDATE appointments 
SET status='COMPLETED'
WHERE appointment_id = currval('appointments_appointment_id_seq');

COMMIT;

SELECT pg_current_wal_lsn();



-- payment failure
BEGIN;
SELECT pg_current_wal_lsn();

INSERT INTO appointments (patient_id, doctor_id, status)
VALUES (2,1,'BOOKED');

INSERT INTO hospital_payments (appointment_id, amount, payment_status)
VALUES (currval('appointments_appointment_id_seq'), 2000,'FAILED');

SELECT 1/0;

ROLLBACK;



--3. Emergency → Treated → Paid → Leaves
BEGIN;
SELECT pg_current_wal_lsn();

INSERT INTO emergency_cases (patient_id, status)
VALUES (3,'TREATED');

INSERT INTO hospital_payments (appointment_id, amount, payment_status)
VALUES (NULL, 5000,'SUCCESS');

COMMIT;

SELECT pg_current_wal_lsn();

--4. Emergency → Patient Dies
BEGIN;

INSERT INTO emergency_cases (patient_id, status)
VALUES (2,'DEAD');

COMMIT;

--5. Emergency → Transfer to another branch
BEGIN;

INSERT INTO emergency_cases (patient_id, status)
VALUES (1,'TREATED');

SAVEPOINT treated;

UPDATE emergency_cases 
SET status='TRANSFERRED'
WHERE case_id = currval('emergency_cases_case_id_seq');

COMMIT;

--6. IPD Case
BEGIN;

INSERT INTO ipd_cases (patient_id, status)
VALUES (1,'ADMITTED');

UPDATE ipd_cases 
SET status='DISCHARGED'
WHERE ipd_id = currval('ipd_cases_ipd_id_seq');

COMMIT;