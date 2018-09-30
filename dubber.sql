insert into home_addresses (dubber_id, postcode, city, address) values (17, '20090', 'Milano', 'Via libertà 44');

delete from banks;

ALTER TABLE dubbers DROP COLUMN home_postcode RESTRICT;

DROP TABLE enpals_parameters;

ALTER TABLE qualifications DROP COLUMN descrizione;

ALTER TABLE qualifications ADD code varchar(3) not null;

ALTER Table home_addresses ADD _default SET DEFAULT false;

ALTER TABLE banks ADD CONSTRAINT dubber_bank FOREIGN KEY (dubber_id) REFERENCES dubbers(id);

ALTER TABLE dubbers ADD CONSTRAINT fromDubberToBank FOREIGN KEY (id) REFERENCES banks(id);

create table banks (
	id INTEGER PRIMARY KEY NOT NULL DEFAULT NEXTVAL('banks_id_seq'::regclass),
	dubber_id integer not null,	
	bank_name varchar(100),
	bank_agency varchar(50),
	bank_account varchar(20),
	abi varchar(10),
	cab varchar(10)
);


create table qualifications (
  id INTEGER PRIMARY KEY NOT NULL DEFAULT NEXTVAL('qualifications_id_seq'::regclass),
	code varchar(3) not null,
	description varchar(100)
);



create table residence_addresses (
	id INTEGER PRIMARY KEY NOT NULL DEFAULT NEXTVAL('residence_address_id_seq'::regclass),
	dubber_id integer not null,
	address varchar(100),
	postcode varchar(5),
	city varchar(50),
	FOREIGN KEY (dubber_id) REFERENCES dubbers(id)
);

create table home_addresses (
	id INTEGER PRIMARY KEY NOT NULL DEFAULT NEXTVAL('home_address_id_seq'::regclass),
	dubber_id integer not null,
	address varchar(100),
	postcode varchar(5),
	city varchar(50),
	FOREIGN KEY (dubber_id) REFERENCES dubbers(id)
);

CREATE SEQUENCE enpals_parameters_id_seq;

create table enpals_categories (
	id INTEGER PRIMARY KEY NOT NULL DEFAULT NEXTVAL('enpals_categories_id_seq'::regclass),
	dubber_id integer not null,
	matricola_enpals varchar(15),
	cat_contrib varchar(1),
	pensionato smallint,
	iscrizione_sindacato smallint,
	FOREIGN KEY (dubber_id) REFERENCES dubbers(id)
);

ALTER TABLE banks
  RENAME COLUMN default_bank TO _default
  
  
ALTER TABLE banks
  ALTER COLUMN default_bank SET DEFAULT false;

ALTER TABLE residence_addresses
  ADD COLUMN "_default" BOOLEAN DEFAULT FALSE;

ALTER TABLE home_address RENAME TO home_addresses;

UPDATE enpals_categories
SET forfettone = 2
WHERE id = 1;

create view dubbers_per_film as
select f.title, f.description, c.film_id, d.id, d.name, d.surname
from films f
inner join contracts c on f.id = c.film_id
inner join dubbers d on c.dubber_id = d.id
group by f.title, f.description, c.film_id, d.id, d.name, d.surname;