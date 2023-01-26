import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
    createBook: protectedProcedure
    .input(z.object({
        name: z.string(),
        description: z.string(),
        userId: z.string(),
        category: z.string()
    }))
    .mutation(async({ctx, input})=>{
        const books = await ctx.prisma.book.create({
            data:{
                name: input.name,
                description: input.description,
                userId: input.userId,
                category: input.category,
            },
        })
        return books
    }),

    getAll: protectedProcedure
    .query(({ctx})=>{
        
        return ctx.prisma.book.findMany();
    }),
    
})
