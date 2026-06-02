export type AppCategory = 'presentation';

export interface ProjectManifest {
  name: string;
  title: string;
  category: AppCategory;
  description: string;
  languages: string[];
  entrypoints: {
    html: string;
    css: string;
    javascript: string;
  };
}

export const projectManifest: ProjectManifest = {
  name: 'markdown-slide-deck',
  title: 'Markdown Slide Deck',
  category: 'presentation',
  description: 'A markdown presentation tool with keyboard navigation, code blocks, and clean themes.',
  languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'JSON', 'Markdown'],
  entrypoints: {
    html: 'index.html',
    css: 'assets/styles.css',
    javascript: 'assets/app.js'
  }
};
