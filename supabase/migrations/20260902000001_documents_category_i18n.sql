-- Nom de catégorie en anglais (les intitulés de sections de la data room).
-- Fallback : si category_en est nulle, la version française est affichée.

alter table public.documents
  add column category_en text;
