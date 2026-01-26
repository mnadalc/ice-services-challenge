import { z } from 'zod';

export const songSchema = z.object({
  id: z.number(),
  songName: z.string(),
  author: z.string(),
  progress: z.number().meta({
    description:
      'A number between 0 and 1 representing the percentage of calculated royalties for the author of the song.',
  }),
});
export type Song = z.infer<typeof songSchema>;

export const songsSchema = z.array(songSchema);

export const issuedInvoiceSchema = songSchema.omit({ id: true }).extend({
  id: z.string(),
  songId: z.number(),
  issuedAt: z.date(),
});
export type IssuedInvoice = z.infer<typeof issuedInvoiceSchema>;
