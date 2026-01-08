import { defineCollection, z } from 'astro:content';

const gallery = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.enum(['bodas', 'retratos', 'paisajes', 'editorial']),
    image: image(),
    date: z.date(),
    featured: z.boolean().default(false),
  }),
});

const services = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    features: z.array(z.string()),
  }),
});

export const collections = { gallery, services };
