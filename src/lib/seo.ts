import { site } from '../config/site';

/** Appends the brand only when the title still fits in Google's ~65 character display. */
export function brandTitle(title: string, max = 65) {
  if (title.includes(site.name)) return title;
  const branded = `${title} | ${site.name}`;
  return branded.length <= max ? branded : title;
}
