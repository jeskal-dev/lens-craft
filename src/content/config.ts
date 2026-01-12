import { defineCollection, z } from "astro:content";

const gallery = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.enum([
      "bodas",
      "retratos",
      "familia",
      "editorial",
      "producto",
      "eventos",
      "otros",
      "paisajes",
    ]),
    image: z.string(),
    date: z.date(),
    description: z.string(),
    author: z.string(),
    featured: z.boolean().default(false),
  }),
});

const services = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    features: z.array(z.string()),
  }),
});

export const collections = { gallery, services };
