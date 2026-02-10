import { z } from 'zod';

export const profileSchema = z.object({
    bio: z.string().min(2).max(100),
     avatar: z.string().url().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
