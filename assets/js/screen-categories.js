(() => {
  "use strict";

  const screenCategories = [
    {
      id: "carved-aluminium",
      title: "Carved Aluminium Screens",
      navLabel: "Carved Aluminium",
      images: []
    },
    {
      id: "glass",
      title: "Glass Screens",
      navLabel: "Glass",
      images: [
        {
          src: "../assets/images/products/screens/glass/glass-stainless-steel-screen-01.webp",
          alt: "Glass and stainless steel decorative screen for an interior partition"
        }
      ]
    },
    {
      id: "laser-cut-stainless-steel",
      title: "Laser-Cut Stainless Steel Screens",
      navLabel: "Laser-Cut Stainless Steel",
      images: [
        {
          src: "../assets/images/products/screens/laser-cut-stainless-steel/laser-cut-stainless-steel-screen-01.webp",
          alt: "Laser-cut stainless steel screen with a scalloped decorative pattern"
        }
      ]
    },
    {
      id: "stainless-steel-mesh",
      title: "Stainless Steel Mesh Screens",
      navLabel: "Stainless Steel Mesh",
      images: []
    },
    {
      id: "minimalist",
      title: "Minimalist Screens",
      navLabel: "Minimalist",
      images: [
        {
          src: "../assets/images/products/screens/minimalist/minimalist-stainless-steel-screen-01.webp",
          alt: "Minimalist stainless steel screen with a linear design"
        }
      ]
    },
    {
      id: "special-design",
      title: "Special Design Screens",
      navLabel: "Special Design",
      images: []
    },
    {
      id: "modern",
      title: "Modern Screens",
      navLabel: "Modern",
      images: []
    },
    {
      id: "new-chinese-style",
      title: "New Chinese-Style Screens",
      navLabel: "New Chinese-Style",
      images: [
        {
          src: "../assets/images/products/screens/new-chinese-style/new-chinese-style-screen-01.webp",
          alt: "New Chinese-style stainless steel screen with fish and circular motifs"
        }
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
