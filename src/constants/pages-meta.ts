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
    pageTitle: "Writing on software design, company building, and art.",
    pageDescription: "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
  },
  "/projects": {
    title: "Projects",
    pageTitle: "Projects Showcase",
    pageDescription: "A collection of my recent projects.",
  },
  "/about": {
    title: "About",
    pageTitle: "About",
    pageDescription: "Learn more about me and my work.",
  },
};
