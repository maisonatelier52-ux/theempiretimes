export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // array of paragraphs to render easily
  categoryId: string;
  authorId: string;
  image: string;
  publishedAt: string; // ISO format
  readingTime: number;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

export interface PopulatedArticle extends Omit<Article, 'categoryId' | 'authorId'> {
  category: Category;
  author: Author;
}

export interface NavigationItem {
  name: string;
  href: string;
}
