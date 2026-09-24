(() => {
  "use strict";

  // Add an image by adding its path and alt text to the matching category below.
  const screenCategories = [
    {
      id: "carved-aluminium",
      title: "Carved Aluminium Screens",
      navLabel: "Carved Aluminium",
      images: [
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-01.webp", alt: "Carved aluminium decorative screen reference 1" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-02.webp", alt: "Carved aluminium decorative screen reference 2" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-03.webp", alt: "Carved aluminium decorative screen reference 3" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-04.webp", alt: "Carved aluminium decorative screen reference 4" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-05.webp", alt: "Carved aluminium decorative screen reference 5" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-06.webp", alt: "Carved aluminium decorative screen reference 6" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-07.webp", alt: "Carved aluminium decorative screen reference 7" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-08.webp", alt: "Carved aluminium decorative screen reference 8" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-09.webp", alt: "Carved aluminium decorative screen reference 9" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-10.webp", alt: "Carved aluminium decorative screen reference 10" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-11.webp", alt: "Carved aluminium decorative screen reference 11" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-12.webp", alt: "Carved aluminium decorative screen reference 12" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-13.webp", alt: "Carved aluminium decorative screen reference 13" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-14.webp", alt: "Carved aluminium decorative screen reference 14" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-15.webp", alt: "Carved aluminium decorative screen reference 15" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-16.webp", alt: "Carved aluminium decorative screen reference 16" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-17.webp", alt: "Carved aluminium decorative screen reference 17" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-18.webp", alt: "Carved aluminium decorative screen reference 18" },
        { src: "../assets/images/products/screens/carved-aluminium/carved-aluminium-screen-19.webp", alt: "Carved aluminium decorative screen reference 19" }
      ]
    },
    {
      id: "glass",
      title: "Glass Screens",
      navLabel: "Glass",
      images: [
        { src: "../assets/images/products/screens/glass/glass-screen-01.webp", alt: "Glass and stainless steel decorative screen reference 1" },
        { src: "../assets/images/products/screens/glass/glass-screen-02.webp", alt: "Glass and stainless steel decorative screen reference 2" },
        { src: "../assets/images/products/screens/glass/glass-screen-03.webp", alt: "Glass and stainless steel decorative screen reference 3" },
        { src: "../assets/images/products/screens/glass/glass-screen-04.webp", alt: "Glass and stainless steel decorative screen reference 4" },
        { src: "../assets/images/products/screens/glass/glass-screen-05.webp", alt: "Glass and stainless steel decorative screen reference 5" },
        { src: "../assets/images/products/screens/glass/glass-screen-06.webp", alt: "Glass and stainless steel decorative screen reference 6" },
        { src: "../assets/images/products/screens/glass/glass-screen-07.webp", alt: "Glass and stainless steel decorative screen reference 7" },
        { src: "../assets/images/products/screens/glass/glass-screen-08.webp", alt: "Glass and stainless steel decorative screen reference 8" },
        { src: "../assets/images/products/screens/glass/glass-screen-09.webp", alt: "Glass and stainless steel decorative screen reference 9" },
        { src: "../assets/images/products/screens/glass/glass-screen-10.webp", alt: "Glass and stainless steel decorative screen reference 10" },
        { src: "../assets/images/products/screens/glass/glass-screen-11.webp", alt: "Glass and stainless steel decorative screen reference 11" },
        { src: "../assets/images/products/screens/glass/glass-screen-12.webp", alt: "Glass and stainless steel decorative screen reference 12" },
        { src: "../assets/images/products/screens/glass/glass-screen-13.webp", alt: "Glass and stainless steel decorative screen reference 13" },
        { src: "../assets/images/products/screens/glass/glass-screen-14.webp", alt: "Glass and stainless steel decorative screen reference 14" },
        { src: "../assets/images/products/screens/glass/glass-screen-15.webp", alt: "Glass and stainless steel decorative screen reference 15" },
        { src: "../assets/images/products/screens/glass/glass-screen-16.webp", alt: "Glass and stainless steel decorative screen reference 16" }
      ]
    },
    {
      id: "laser-cut-stainless-steel",
      title: "Laser-Cut Stainless Steel Screens",
      navLabel: "Laser-Cut Stainless Steel",
      images: [
        { src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-01.webp", alt: "Laser-cut stainless steel screen with a custom decorative pattern 1" },
        { src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-02.webp", alt: "Laser-cut stainless steel screen with a custom decorative pattern 2" },
        { src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-03.webp", alt: "Laser-cut stainless steel screen with a custom decorative pattern 3" },
        { src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-04.webp", alt: "Laser-cut stainless steel screen with a custom decorative pattern 4" },
        { src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-05.webp", alt: "Laser-cut stainless steel screen with a custom decorative pattern 5" },
        { src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-06.webp", alt: "Laser-cut stainless steel screen with a custom decorative pattern 6" },
        { src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-07.webp", alt: "Laser-cut stainless steel screen with a custom decorative pattern 7" }
      ]
    },
    {
      id: "stainless-steel-mesh",
      title: "Stainless Steel Mesh Screens",
      navLabel: "Stainless Steel Mesh",
      images: [
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-01.webp", alt: "Stainless steel mesh screen for an interior partition 1" },
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-02.webp", alt: "Stainless steel mesh screen for an interior partition 2" },
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-03.webp", alt: "Stainless steel mesh screen for an interior partition 3" },
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-04.webp", alt: "Stainless steel mesh screen for an interior partition 4" },
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-05.webp", alt: "Stainless steel mesh screen for an interior partition 5" },
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-06.webp", alt: "Stainless steel mesh screen for an interior partition 6" },
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-07.webp", alt: "Stainless steel mesh screen for an interior partition 7" },
        { src: "../assets/images/products/screens/stainless-steel-mesh/stainless-steel-mesh-screen-08.webp", alt: "Stainless steel mesh screen for an interior partition 8" }
      ]
    },
    {
      id: "minimalist",
      title: "Minimalist Screens",
      navLabel: "Minimalist",
      images: [
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-01.webp", alt: "Minimalist stainless steel screen with a linear design 1" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-02.webp", alt: "Minimalist stainless steel screen with a linear design 2" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-03.webp", alt: "Minimalist stainless steel screen with a linear design 3" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-04.webp", alt: "Minimalist stainless steel screen with a linear design 4" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-05.webp", alt: "Minimalist stainless steel screen with a linear design 5" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-06.webp", alt: "Minimalist stainless steel screen with a linear design 6" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-07.webp", alt: "Minimalist stainless steel screen with a linear design 7" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-08.webp", alt: "Minimalist stainless steel screen with a linear design 8" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-09.webp", alt: "Minimalist stainless steel screen with a linear design 9" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-10.webp", alt: "Minimalist stainless steel screen with a linear design 10" },
        { src: "../assets/images/products/screens/minimalist/minimalist-screen-11.webp", alt: "Minimalist stainless steel screen with a linear design 11" }
      ]
    },
    {
      id: "special-design",
      title: "Special Design Screens",
      navLabel: "Special Design",
      images: [
        { src: "../assets/images/products/screens/special-design/special-design-screen-01.webp", alt: "Special design decorative screen reference 1" },
        { src: "../assets/images/products/screens/special-design/special-design-screen-02.webp", alt: "Special design decorative screen reference 2" },
        { src: "../assets/images/products/screens/special-design/special-design-screen-03.webp", alt: "Special design decorative screen reference 3" },
        { src: "../assets/images/products/screens/special-design/special-design-screen-04.webp", alt: "Special design decorative screen reference 4" },
        { src: "../assets/images/products/screens/special-design/special-design-screen-05.webp", alt: "Special design decorative screen reference 5" }
      ]
    },
    {
      id: "modern",
      title: "Modern Screens",
      navLabel: "Modern",
      images: [
        { src: "../assets/images/products/screens/modern/modern-screen-01.webp", alt: "Modern stainless steel decorative screen reference 1" },
        { src: "../assets/images/products/screens/modern/modern-screen-02.webp", alt: "Modern stainless steel decorative screen reference 2" },
        { src: "../assets/images/products/screens/modern/modern-screen-03.webp", alt: "Modern stainless steel decorative screen reference 3" },
        { src: "../assets/images/products/screens/modern/modern-screen-04.webp", alt: "Modern stainless steel decorative screen reference 4" },
        { src: "../assets/images/products/screens/modern/modern-screen-05.webp", alt: "Modern stainless steel decorative screen reference 5" },
        { src: "../assets/images/products/screens/modern/modern-screen-07.webp", alt: "Modern stainless steel decorative screen reference 7" },
        { src: "../assets/images/products/screens/modern/modern-screen-08.webp", alt: "Modern stainless steel decorative screen reference 8" },
        { src: "../assets/images/products/screens/modern/modern-screen-09.webp", alt: "Modern stainless steel decorative screen reference 9" },
        { src: "../assets/images/products/screens/modern/modern-screen-10.webp", alt: "Modern stainless steel decorative screen reference 10" },
        { src: "../assets/images/products/screens/modern/modern-screen-11.webp", alt: "Modern stainless steel decorative screen reference 11" }
      ]
    },
    {
      id: "new-chinese-style",
      title: "New Chinese-Style Screens",
      navLabel: "New Chinese-Style",
      images: [
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-01.webp", alt: "New Chinese-style stainless steel decorative screen reference 1" },
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-02.webp", alt: "New Chinese-style stainless steel decorative screen reference 2" },
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-03.webp", alt: "New Chinese-style stainless steel decorative screen reference 3" },
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-04.webp", alt: "New Chinese-style stainless steel decorative screen reference 4" },
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-05.webp", alt: "New Chinese-style stainless steel decorative screen reference 5" },
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-06.webp", alt: "New Chinese-style stainless steel decorative screen reference 6" },
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-07.webp", alt: "New Chinese-style stainless steel decorative screen reference 7" },
        { src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-09.webp", alt: "New Chinese-style stainless steel decorative screen reference 9" }
      ]
    }
  ];

  window.STEELLCX_SCREEN_CATEGORIES = screenCategories;

  const navigation = document.querySelector("[data-screen-category-nav]");
  const galleries = document.querySelector("[data-screen-category-galleries]");

  if (!navigation || !galleries) return;

  screenCategories
    .filter((category) => category.images.length > 0)
    .forEach((category) => {
      const link = document.createElement("a");
      link.href = `#screen-${category.id}`;
      link.textContent = category.navLabel;
      navigation.append(link);

      const section = document.createElement("section");
      section.className = "screen-category";
      section.id = `screen-${category.id}`;
      section.setAttribute("aria-labelledby", `screen-${category.id}-title`);

      const heading = document.createElement("h3");
      heading.className = "screen-category__title";
      heading.id = `screen-${category.id}-title`;
      heading.textContent = category.title;
      section.append(heading);

      const grid = document.createElement("div");
      grid.className = "gallery-grid screen-category__grid";

      category.images.forEach((image) => {
        const figure = document.createElement("figure");
        const element = document.createElement("img");
        element.src = image.src;
        element.alt = image.alt;
        element.loading = "lazy";
        element.decoding = "async";
        figure.append(element);
        grid.append(figure);
      });

      section.append(grid);
      galleries.append(section);
    });
})();
