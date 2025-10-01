// netlify/functions/blog.ts
// Node 18+ on Netlify has global fetch / Request / Response.
// Returns an array of posts with shape:
// { title, date, tags (comma string), summary, body (markdown-ish plain text), image, imageAlt, slug }

type SanityRef = { _ref?: string; _type?: string };
type SanityImage = { asset?: {_ref?: string; url?: string}; alt?: string };
type SanityPost = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  _createdAt?: string;
  tags?: Array<{ title?: string } | string> | null;
  summary?: string;
  body?: any[]; // Portable Text blocks
  mainImage?: SanityImage;
};

const PROJECT_ID = process.env.SANITY_PROJECT_ID!;
const DATASET     = process.env.SANITY_DATASET || "production";
const API_VERSION = process.env.SANITY_API_VERSION || "2023-10-10";
// If you want **drafts** or private datasets, add a token in Netlify env:
const TOKEN       = process.env.SANITY_TOKEN || "";

const useCDN = !TOKEN; // If token not provided, use CDN (published only)

const apiBase = useCDN
  ? `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`
  : `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

const GROQ = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0..199]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _createdAt,
  summary,
  tags[]->{title},
  body,
  mainImage{
    asset->{
      url
    },
    alt
  }
}`;

function portableTextToPlain(mdBlocks: any[] | undefined): string {
  if (!Array.isArray(mdBlocks)) return "";
  // Simple, safe fallback: join paragraphs & list items as plain text.
  const parts: string[] = [];
  for (const block of mdBlocks) {
    if (block?._type === "block") {
      const text = (block.children || []).map((c: any) => c.text || "").join("");
      parts.push(text.trim());
    } else if (block?._type === "list" || block?._type === "listItem") {
      const text = (block.children || []).map((c: any) => c.text || "").join("");
      if (text) parts.push("- " + text.trim());
    }
  }
  return parts.join("\n");
}

function arrTagsToComma(t: SanityPost["tags"]): string {
  if (!t) return "";
  const flat = t.map((x: any) => (typeof x === "string" ? x : x?.title || "")).filter(Boolean);
  return Array.from(new Set(flat)).join(",");
}

export default async (req: Request) => {
  try {
    if (!PROJECT_ID) {
      return new Response(JSON.stringify({ error: "Missing SANITY_PROJECT_ID" }), {
        status: 500,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const url = `${apiBase}?query=${encodeURIComponent(GROQ)}`;
    const headers: Record<string,string> = { "accept": "application/json" };
    if (TOKEN) headers["authorization"] = `Bearer ${TOKEN}`;

    const res = await fetch(url, { headers });
    if (!res.ok) {
      const txt = await res.text();
      return new Response(JSON.stringify({ error: "Sanity query failed", status: res.status, body: txt }), {
        status: 502,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    const json = await res.json();
    const items: SanityPost[] = json.result || [];

    // Normalise to front-end shape
    const out = items.map((p) => {
      const title = p.title || "Untitled";
      const date  = p.publishedAt || p._createdAt || new Date().toISOString();
      const tags  = arrTagsToComma(p.tags || null);
      const summary = p.summary || "";
      const body = portableTextToPlain(p.body || []);
      const image = p.mainImage?.asset?.url || "";
      const imageAlt = p.mainImage?.alt || title;
      const slug = p.slug || (p._id ?? "").slice(0, 12);
      return { title, date, tags, summary, body, image, imageAlt, slug };
    });

    return new Response(JSON.stringify(out), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=60", // light caching
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err?.message || err) }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
};
