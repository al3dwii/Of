import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  title: string;
  date: string;
  published: boolean;
  slug: string;
  excerpt: string;
  content: string;
  // Optional frontmatter fields
  updated?: string;
  description?: string;
  image?: string;
  author?: string;
  category?: string;
  readingTime?: string;
  tags?: string[];
  keywords?: string[];
  canonical?: string;
  language?: string;
  // Translation fields
  translationKey?: string; // Unique key to link translations together
  availableLanguages?: string[]; // Languages this post is available in
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts');

  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);

      return {
        // Required fields
        title: data.title,
        date: data.date,
        published: data.published ?? true,
        slug: data.slug,
        excerpt: data.excerpt || data.description || content.slice(0, 160),
        content,
        // Optional frontmatter fields
        updated: data.updated,
        description: data.description,
        image: data.image,
        author: data.author,
        category: data.category,
        readingTime: data.readingTime,
        tags: data.tags,
        keywords: data.keywords,
        canonical: data.canonical,
        language: data.language || 'ar', // Default to Arabic for backward compatibility
        // Translation fields
        translationKey: data.translationKey,
        availableLanguages: data.availableLanguages,
      };
    })
    .filter((post) => post.published); // Only return published posts

  return posts;
}

/**
 * Get posts filtered by language
 */
export function getPostsByLanguage(language: string): Post[] {
  return getAllPosts().filter((post) => post.language === language);
}

/**
 * Get a specific post by slug and language
 */
export function getPostBySlugAndLanguage(slug: string, language: string): Post | undefined {
  const posts = getAllPosts();
  
  // First try to find exact match (slug + language)
  let post = posts.find((p) => p.slug === slug && p.language === language);
  
  // If not found, try to find by translationKey
  if (!post) {
    const translationKeyMatch = posts.find((p) => p.slug === slug);
    if (translationKeyMatch?.translationKey) {
      post = posts.find(
        (p) => p.translationKey === translationKeyMatch.translationKey && p.language === language
      );
    }
  }
  
  return post;
}

/**
 * Get all translations of a post
 */
export function getPostTranslations(post: Post): Post[] {
  if (!post.translationKey) {
    return [post]; // No translations available
  }
  
  const allPosts = getAllPosts();
  return allPosts.filter((p) => p.translationKey === post.translationKey);
}

/**
 * Check if a post has a translation in a specific language
 */
export function hasTranslation(post: Post, language: string): boolean {
  if (!post.translationKey) {
    return post.language === language;
  }
  
  const translations = getPostTranslations(post);
  return translations.some((p) => p.language === language);
}


// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

// export interface Post {
//   title: string;
//   date: string;
//   published: boolean;
//   slug: string;
//   content: string;
// }

// export function getAllPosts(): Post[] {
//   const postsDirectory = path.join(process.cwd(), 'src/content/posts');

//   // Check if the directory exists, and create it if it doesn't
//   if (!fs.existsSync(postsDirectory)) {
//     fs.mkdirSync(postsDirectory, { recursive: true });
//     return []; // Return an empty array as there are no posts yet
//   }

//   const filenames = fs.readdirSync(postsDirectory);
//   return filenames.map((filename) => {
//     const filePath = path.join(postsDirectory, filename);
//     const fileContents = fs.readFileSync(filePath, 'utf-8');
//     const { data, content } = matter(fileContents);

//     return {
//       title: data.title,
//       date: data.date,
//       published: data.published,
//       slug: data.slug,
//       content,
//     };
//   });
// }

