-- Run this if you already created the events table without registration_form_url.
alter table events
  add column if not exists registration_form_url text;

comment on column events.registration_form_url is
  'Google Form URL (forms.gle or docs.google.com/forms) for event registration';
