import z from 'zod';

export const MappingItemSchema = z.object({
  originKeyName: z.string(),
  mappedKeyName: z.string(),
  aliases: z.string().array(),
});

export const MappingSchema = z.object({
  mapping: z.array(MappingItemSchema),
});
