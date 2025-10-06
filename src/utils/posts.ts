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
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts');

  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);
  return filenames
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
        language: data.language,
      };
    })
    .filter((post) => post.published); // Only return published posts
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

