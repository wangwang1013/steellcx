document.addEventListener("DOMContentLoaded", () => {
  const videos = [...document.querySelectorAll("[data-factory-video]")];
  const staticMedia = window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)");

  if (!videos.length || staticMedia.matches) return;

  const loadVideo = (video) => {
    if (video.dataset.loaded) return;

    const source = document.createElement("source");
    source.src = video.dataset.src;
    source.type = "video/mp4";
    video.append(source);
    video.dataset.loaded = "true";
    video.load();
  };

  let activeVideo = null;
  const handleEntries = (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (!entry.isIntersecting) {
        video.pause();
        if (activeVideo === video) activeVideo = null;
        return;
      }

      if (activeVideo && activeVideo !== video) activeVideo.pause();
      activeVideo = video;
      const playVideo = () => video.play().catch(() => {});

      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        playVideo();
        return;
      }

      video.addEventListener("canplay", playVideo, { once: true });
      loadVideo(video);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(handleEntries, { threshold: 0.3 });
    videos.forEach((video) => observer.observe(video));
    return;
  }

  const checkVisibleVideos = () => {
    handleEntries(videos.map((video) => {
      const rect = video.getBoundingClientRect();
      return { target: video, isIntersecting: rect.top < window.innerHeight && rect.bottom > 0 };
    }));
  };

  window.addEventListener("scroll", checkVisibleVideos, { passive: true });
  checkVisibleVideos();
});
