import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
    createBook: publicProcedure
    .input(z.object({
        name: z.string(),
        description: z.string(),
        body: z.string().optional().default(''),
        author: z.string(),
        category: z.string()
    }))
    .mutation(async({ctx, input})=>{
        const books = await ctx.prisma.book.create({
            data:{
                name: input.name,
                description: input.description,
                body: input.body,
                userId: 'cld4hwuix00025t7rp5geo75x',
                category: input.category,
            },
        })
        return books
    }),

    getAll: publicProcedure
    .query(({ctx})=>{
        
        return ctx.prisma.book.findMany();
    }),
    
})