// Fades [data-reveal] elements in once as they enter the viewport.
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && items.length) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-visible'));
}
