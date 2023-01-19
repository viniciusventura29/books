import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
    createBook: publicProcedure
    .input(z.object({
        name: z.string(),
        description: z.string(),
        body: z.string().optional(),
        author: z.string(),
        category: z.string()
    }))
    .mutation(({input})=>{
        return input
    }),

    getAll: publicProcedure
    .query(({ctx})=>{
        return ctx.prisma.book.findMany();
    })
    
})