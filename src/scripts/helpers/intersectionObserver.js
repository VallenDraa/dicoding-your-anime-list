export default function observe(elements, callback) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) callback();
    });
  });

  observer.observe(elements);
}
