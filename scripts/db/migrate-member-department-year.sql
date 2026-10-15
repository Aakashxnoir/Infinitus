-- Run this if you already created the members table without department / year.
alter table members
  add column if not exists department text,
  add column if not exists year text;

comment on column members.department is 'Department, e.g. CSE, ECE, AIDS, H & S';
comment on column members.year is 'Year of study (e.g. III Year) or designation for faculty';
