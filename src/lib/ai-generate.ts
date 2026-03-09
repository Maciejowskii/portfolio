import OpenAI from "openai";
import { searchMultipleImages, type BlogImage } from "./pexels";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  coverImage: string;
  language: string;
}

interface AIResponse {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  imageQueries: string[];
}

function buildSystemPrompt(language: string): string {
  const lang = language === "pl" ? "Polish" : "English";

  return `You are a senior full-stack developer and technical writer. You write blog posts for the personal portfolio of Maciej Tyra, a CTO & Co-Founder at Digitay.pl, a developer who builds web apps with Next.js, React, TypeScript, Django, WordPress, and works with SEO, analytics, and digital marketing.

CRITICAL RULES (follow every single one):

1. WRITING STYLE:
   - Write in ${lang}.
   - Write like an experienced developer sharing real knowledge in a personal blog. NOT like a corporate content mill. NOT like ChatGPT.
   - NEVER use these phrases or anything similar: "w dzisiejszym dynamicznym świecie", "warto zauważyć", "podsumowując", "w erze cyfrowej", "nie jest tajemnicą", "kluczowym aspektem jest", "in today's fast-paced world", "it's worth noting", "in conclusion", "it goes without saying", "let's dive in".
   - Use first person ("I", "ja") occasionally. Share opinions. Be direct, concrete, and opinionated.
   - Never use em dashes (—) or long dashes. Use colons, periods, or new sentences instead. Avoid hyphen-heavy phrasing that feels like AI.
   - Vary sentence length. Mix short punchy sentences with longer explanations.
   - Include real code snippets where relevant (properly formatted in Markdown code blocks with language tags).

2. LENGTH & STRUCTURE:
   - Minimum 1500 words, aim for 2000+.
   - 6-10 sections with H2 (##) and H3 (###) headings.
   - Start with a compelling intro paragraph (no heading for intro). Hook the reader immediately with a problem, question, or bold statement.
   - End with a practical takeaway section, not a generic summary.

3. IMAGES:
   - Return exactly 4 image search queries in the "imageQueries" array.
   - These will be used to search Pexels for stock photos.
   - Make queries specific and descriptive (e.g. "developer coding on laptop dark room", "website performance metrics dashboard", "team collaborating on whiteboard").
   - The first query should be suitable as a cover/hero image for the post.

4. BACKLINKS (mandatory):
   - Include at least 3 internal links woven naturally into the text:
     * Link to https://digitay.pl with anchor text related to web development services, digital agency, or website creation.
     * Link to https://katalogo.pl with anchor text related to business directories, finding local businesses, or Polish business listings.
     * Link to https://maciejtyra.pl with anchor text related to the author's portfolio, developer services, or full-stack development.
   - These must feel natural in context, not forced. Weave them into relevant paragraphs.

5. EXTERNAL LINKS (mandatory):
   - Include at least 1 link to a reputable external source (official documentation, MDN, Vercel docs, Google developers, authoritative tech blog, etc.).
   - Use the link where it adds value to the reader.

6. SEO:
   - "metaTitle": max 60 characters, include the primary keyword naturally.
   - "metaDescription": max 155 characters, compelling and includes keyword.
   - "slug": URL-friendly, lowercase, hyphens, no special chars, max 5-6 words.
   - "tags": 3-6 relevant tags. Use concise labels (2-4 words), title case. Prefer reusable categories: AI automation, SEO, web development, Next.js, performance, analytics, business tools, WordPress. Avoid long keyword-style phrases to keep the tag vocabulary manageable.
   - "excerpt": 1-2 sentences, compelling summary for blog list cards.
   - Use the primary keyword in the first paragraph, in at least 2 headings, and naturally throughout (aim for ~1-2% keyword density, never stuffed).

RESPOND ONLY WITH VALID JSON in this exact format (no markdown fences, no explanation, just JSON):

{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "... (full Markdown article) ...",
  "metaTitle": "...",
  "metaDescription": "...",
  "tags": ["...", "..."],
  "imageQueries": ["query1", "query2", "query3", "query4"]
}`;
}

function buildUserPrompt(topic: string, keywords?: string): string {
  let prompt = `Write a comprehensive blog post about: ${topic}`;
  if (keywords) {
    prompt += `\n\nTarget SEO keywords to focus on: ${keywords}`;
  }
  return prompt;
}

function insertImagesIntoContent(content: string, images: BlogImage[]): string {
  if (images.length === 0) return content;

  const sections = content.split(/\n(?=## )/);
  if (sections.length <= 1) return content;

  const interval = Math.max(1, Math.floor((sections.length - 1) / images.length));
  let imageIndex = 0;

  const result = sections.map((section, i) => {
    if (i > 0 && imageIndex < images.length && i % interval === 0) {
      const img = images[imageIndex];
      imageIndex++;
      const imageMarkdown = `\n\n![${img.alt}](${img.url})\n*Photo by [${img.photographer}](${img.photographerUrl}) on [Pexels](${img.pexelsUrl})*\n\n`;
      return imageMarkdown + section;
    }
    return section;
  });

  return result.join("\n");
}

export async function generateBlogPost(
  topic: string,
  language: string = "pl",
  keywords?: string
): Promise<GeneratedPost> {
  const systemPrompt = buildSystemPrompt(language);
  const userPrompt = buildUserPrompt(topic, keywords);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.8,
    max_tokens: 6000,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("Empty response from OpenAI");

  let parsed: AIResponse;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Failed to parse AI response as JSON");
  }

  if (!parsed.title || !parsed.content) {
    throw new Error("AI response missing required fields");
  }

  const images = await searchMultipleImages(parsed.imageQueries || []);

  const contentWithImages = insertImagesIntoContent(parsed.content, images);

  const coverImage = images.length > 0 ? images[0].url : "";

  return {
    title: parsed.title,
    slug: parsed.slug || "",
    excerpt: parsed.excerpt || "",
    content: contentWithImages,
    metaTitle: parsed.metaTitle || parsed.title,
    metaDescription: parsed.metaDescription || parsed.excerpt || "",
    tags: parsed.tags || [],
    coverImage,
    language,
  };
}
