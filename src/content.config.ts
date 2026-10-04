import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const brands = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/brands' }),
	schema: z.object({
		name: z.string(),
		order: z.number(),
		sector: z.string(),
		summary: z.string(),
		alternatives: z.array(z.string()).default([]),
		sources: z
			.array(z.object({ title: z.string(), url: z.string().url() }))
			.default([]),
	}),
});

const organizations = defineCollection({
	loader: file('./src/content/organizations.json'),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			url: z.string().url().optional(),
			logo: image().optional(),
		}),
});

const materials = defineCollection({
	loader: file('./src/content/materials.json'),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			kind: z.enum(['poster', 'leaflet', 'stickers', 'banner']),
			description: z.string(),
			// Served as a static file from public/, so the download URL is stable.
			file: z.string().startsWith('/materials/'),
			// Shown next to the download link, e.g. "PDF · A2".
			format: z.string(),
			preview: image(),
			order: z.number(),
		}),
});

export const collections = { brands, organizations, materials };
