import {z} from 'zod';

export const categorySchema = z.object({
    name: z.string().min(4, "name should be at least 3 characters..").max(100, "name should be less than 100 characters")
})

