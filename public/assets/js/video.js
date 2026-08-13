document.addEventListener("DOMContentLoaded", () => {
  const videos = [...document.querySelectorAll("[data-factory-video]")];

  if (!videos.length || !("IntersectionObserver" in window)) return;

  let activeVideo = null;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (!entry.isIntersecting) {
        video.pause();
        if (activeVideo === video) activeVideo = null;
        return;
      }

      if (activeVideo && activeVideo !== video) activeVideo.pause();
      activeVideo = video;
      video.play().catch(() => {});
    });
  }, { threshold: 0.3 });

  videos.forEach((video) => observer.observe(video));
});
