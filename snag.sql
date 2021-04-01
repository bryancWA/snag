CREATE DATABASE snaguser;

\c snaguser;

CREATE TABLE userinput (
  id SERIAL,
  username VARCHAR(30),
  sitename VARCHAR(100),
  flow_height DECIMAL,
  unitname VARCHAR(15),
  activity VARCHAR(60)

);