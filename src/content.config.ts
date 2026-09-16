import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const marques = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/marques' }),
	schema: z.object({
		nom: z.string(),
		ordre: z.number(),
		sector: z.string(),
		resum: z.string(),
		alternatives: z.array(z.string()).default([]),
		fonts: z
			.array(z.object({ titol: z.string(), url: z.string().url() }))
			.default([]),
	}),
});

const organitzacions = defineCollection({
	loader: file('./src/content/organitzacions.json'),
	schema: ({ image }) =>
		z.object({
			nom: z.string(),
			url: z.string().url(),
			logo: image().optional(),
		}),
});

export const collections = { marques, organitzacions };
