import { createMedia } from "@artsy/fresnel";

// Ref : https://tailwindcss.com/docs/responsive-design#overview
export const BREAKPOINTS = {
  // @media (min-width: 0px) { ... }
  xs: 0,
  // @media (min-width: 640px) { ... }
  sm: 640,
  // @media (min-width: 768px) { ... }
  md: 768,
  // @media (min-width: 1024px) { ... }
  lg: 1024,
  // @media (min-width: 1280px) { ... }
  xl: 1280,
  // 	@media (min-width: 1536px) { ... }
  "2xl": 1536,
};

const AppMedia = createMedia({
  breakpoints: BREAKPOINTS,
});

// Make styles for injection into the header of the page
export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
