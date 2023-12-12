import { z } from 'zod';

export const todoSchemaAdd = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    priority: z.number().min(1).optional(),
    dateTime: z.date().optional(),
    status: z.number().min(1).optional(),
    isActive: z.boolean().default(true),
});

export const todoSchemaUpdate = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    priority: z.number().min(1).optional(),
    dateTime: z.date().optional(),
    status: z.number().min(1).optional(),
    isActive: z.boolean().default(true),
});

export const labelSchemaAdd = z.object({
    title: z.string().min(1)
});

export const labelSchemaUpdate = z.object({
    title: z.string().min(1).optional()
});