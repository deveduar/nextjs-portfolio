export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
};

export const deslugify = (slug: string): string => {
  return slug.replace(/-/g, ' ');
};
