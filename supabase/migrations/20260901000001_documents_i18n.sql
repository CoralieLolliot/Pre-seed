-- Versions anglaises des documents (data room bilingue FR/EN).
-- Fallback : si la colonne _en est nulle, la version française est affichée.
-- docsend_url_en permet un deck DocSend distinct par langue.

alter table public.documents
  add column title_en text,
  add column content_en text,
  add column docsend_url_en text;
