-- users table 
create table users(
  user_id serial primary key,
  email varchar(255) unique not null,
  phone varchar(255) unique,
  age int,
  name varchar(255),
  course varchar(255),
  semester int,
  university varchar(255),
  password varchar(255) not null,
  created_at date default current_date
);