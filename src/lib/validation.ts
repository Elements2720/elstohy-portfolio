import { z } from 'zod';

export const url = z.string().refine(
  link => !link || /^https:\/\//.test(link) && URL.canParse(link),
  'Use a valid HTTPS URL.',
);
export const privacyText = z.string().refine(
  text => !/(\b(egypt|cairo|mansoura|mahalla|moltaqa|asool|captivate|spectrum for information systems|ix solutions)\b|\bbased\s+in\b|\bEgyptian\s+(?:\w+\s+){0,2}(?:developer|engineer)\b|\bwhatsapp\b|\+\d[\d\s()-]{7,})/i.test(text),
  'Remove personal geography, employer names and phone numbers.',
);
const dateSchema = z.string().refine(
  date => !date || /^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/.test(date),
  'Use a year or a valid year-month date.',
);
const textList = z.array(privacyText).transform(lines => lines.map(line => line.trim()).filter(Boolean));
const platforms = z.array(z.enum(['iOS', 'Android', 'Web']));

export const mediaSchema = z.object({
  public_id: z.string().min(1),
  secure_url: z.string().refine(
    source => source.startsWith('/media/') || /^https:\/\/res\.cloudinary\.com\//.test(source),
    'Select a portfolio image.',
  ),
  width: z.number().positive(),
  height: z.number().positive(),
  format: z.string(),
  resource_type: z.literal('image'),
});
const appSchema = z.object({
  id: z.string(), name: privacyText, type: privacyText, platforms,
  logo: mediaSchema.nullable().optional(), screenshots: z.array(mediaSchema),
  androidUrl: url, iosUrl: url, websiteUrl: url,
});
export const projectSchema = z.object({
  id: z.string().min(1), title: privacyText.trim().min(1, 'Enter a project title.'),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.'),
  shortDescription: privacyText, fullDescription: privacyText, role: privacyText, category: privacyText,
  projectType: z.enum(['standard', 'case-study']),
  technologies: textList, contributions: textList, challenges: textList,
  startDate: dateSchema, endDate: dateSchema,
  logo: mediaSchema.nullable(), coverImage: mediaSchema.nullable(), screenshots: z.array(mediaSchema),
  platforms, apps: z.array(appSchema), androidUrl: url, iosUrl: url, websiteUrl: url, githubUrl: url,
  featured: z.boolean(), status: z.enum(['draft', 'published']), displayOrder: z.number().int(),
  createdAt: z.string(), updatedAt: z.string(),
  caseStudy: z.object({
    overview: privacyText, problem: privacyText, myRole: privacyText, architecture: privacyText,
    technicalChallenges: privacyText, whatIBuilt: privacyText, integrations: privacyText, results: privacyText,
  }),
  seoTitle: privacyText, seoDescription: privacyText, ogImage: mediaSchema.nullable(),
}).superRefine((project, context) => {
  if (project.startDate && project.endDate && project.endDate < project.startDate) {
    context.addIssue({ code: 'custom', path: ['endDate'], message: 'End date must follow start date.' });
  }
  if (project.status !== 'published') return;
  for (const key of ['shortDescription', 'role'] as const) {
    if (!project[key].trim()) context.addIssue({ code: 'custom', path: [key], message: 'Required before publishing.' });
  }
  if (!project.coverImage) context.addIssue({ code: 'custom', path: ['coverImage'], message: 'Add a cover before publishing.' });
  project.apps.forEach((app, index) => {
    if (!app.name.trim()) context.addIssue({ code: 'custom', path: ['apps', index, 'name'], message: 'Name each app before publishing.' });
  });
});
export const profileSchema = z.object({
  displayName: privacyText.trim().min(1), headline: privacyText, secondaryHeadline: privacyText,
  shortBio: privacyText, about: privacyText, email: z.email(), availabilityText: privacyText,
  portrait: mediaSchema.nullable(), heroImage: mediaSchema.nullable(), heroWord: privacyText.trim().min(1),
  resumeUrl: url, resumeSanitized: z.boolean(),
}).superRefine((profile, context) => {
  if (profile.resumeUrl && !profile.resumeSanitized) {
    context.addIssue({ code: 'custom', path: ['resumeUrl'], message: 'Only add a manually reviewed, sanitized resume.' });
  }
});
export const entrySchema = z.object({
  id: z.string(), title: privacyText.trim().min(1), shortDescription: privacyText, details: privacyText,
  summary: privacyText, description: privacyText, startDate: dateSchema, endDate: dateSchema,
  highlights: textList, technologies: textList, relatedProjectIds: z.array(z.string()),
  displayOrder: z.number().int(), published: z.boolean(), updatedAt: z.string(),
}).refine(entry => !entry.startDate || !entry.endDate || entry.endDate >= entry.startDate,
  { path: ['endDate'], message: 'End date must follow start date.' });
export const seoSchema = z.object({
  siteTitle: privacyText.min(1), defaultDescription: privacyText, defaultOgImage: mediaSchema.nullable(),
  canonicalBaseUrl: url.transform(link => link.replace(/\/$/, '')), socialPreviewTitle: privacyText,
});
export const settingsSchema = z.object({
  sitePublished: z.boolean(), defaultProjectSort: z.enum(['displayOrder', 'newest']),
  contactEmail: z.email(), resumeEnabled: z.boolean(),
});
export const socialSchema = z.object({
  email: z.email(), linkedin: url, github: url,
  other: z.array(z.object({ label: privacyText.min(1), url: url.refine(link => Boolean(link)) })),
});
