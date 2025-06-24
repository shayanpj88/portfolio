export interface PageMeta {
  title: string;
  pageTitle: string;
  pageDescription: string;
}

export const metaMap: Record<string, PageMeta> = {
  "/": {
    title: "Home",
    pageTitle: "Welcome to My Portfolio",
    pageDescription: "Explore my projects, articles, and more.",
  },
  "/articles": {
    title: "Articles",
    pageTitle: "Articles Page",
    pageDescription: "Discover my latest articles and writings.",
  },
  "/projects": {
    title: "Projects",
    pageTitle: "Projects Showcase",
    pageDescription: "A collection of my recent projects.",
  },
  "/about": {
    title: "About",
    pageTitle: "About Me",
    pageDescription: "Learn more about me and my work.",
  },
};
