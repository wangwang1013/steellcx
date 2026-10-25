# Language route mapping

English URLs remain unchanged. Only verified, translated pairs are linked with `hreflang` and an active language switch.

| English | Arabic | Status |
| --- | --- | --- |
| `/` | `/ar/` | Translated pair |
| `/products/` | `/ar/products/` | Translated pair |
| `/products/screens/carved-aluminium/` | `/ar/products/screens/carved-aluminium/` | Translated pair |
| `/products/screens/glass/` | `/ar/products/screens/glass/` | Translated pair |
| `/products/screens/laser-cut-stainless-steel/` | `/ar/products/screens/laser-cut-stainless-steel/` | Translated pair |
| `/products/screens/stainless-steel-mesh/` | `/ar/products/screens/stainless-steel-mesh/` | Translated pair |
| `/products/screens/minimalist/` | `/ar/products/screens/minimalist/` | Translated pair |
| `/products/screens/special-design/` | `/ar/products/screens/special-design/` | Translated pair |
| `/products/screens/modern/` | `/ar/products/screens/modern/` | Translated pair |
| `/products/screens/new-chinese-style/` | `/ar/products/screens/new-chinese-style/` | Translated pair |
| `/projects/` | `/ar/projects/` | Translated pair |
| `/factory/` | `/ar/factory/` | Translated pair |
| `/about/` | `/ar/about/` | Translated pair |
| `/contact/` | `/ar/contact/` | Translated pair; shared `/api/rfq` backend |
| `/lp/decorative-screens/` | `/ar/lp/decorative-screens/` | Translated pair |

The Privacy page has no Arabic counterpart; its language menu marks Arabic as unavailable. The Arabic Contact page links to the English Privacy Policy with `lang="en"`. The Arabic page files are generated from the approved English markup and localized copy in `scripts/build-arabic-site.mjs`; both languages use the same CSS, JavaScript, media, and API architecture. Run the script from the repository root when approved English markup changes.

The English advertising landing page retains its existing `noindex, follow` directive. The Arabic page is indexable and included in the sitemap; search engines may not treat the English `noindex` URL as an effective `hreflang` alternate until that directive is separately reviewed and changed.
