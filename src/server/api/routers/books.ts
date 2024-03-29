import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
    createBook: protectedProcedure
    .input(z.object({
        name: z.string(),
        description: z.string(),
        category: z.string()
    }))
    .mutation(async({ctx, input})=>{
        const books = await ctx.prisma.book.create({
            data:{
                name: input.name,
                description: input.description,
                userId: ctx.session.user.id,
                category: input.category
            },
        })
        return books
    }),

    deleteBook: protectedProcedure.input(
        z.object({
            bookId: z.string(), 
        })
    ).mutation(async({ctx, input})=>{

        await ctx.prisma.book.delete({
            where: {
                id: input.bookId,
            }
        })
        }),

    getAll: protectedProcedure
    .query(({ctx})=>{
        return ctx.prisma.book.findMany({
            where:{
                userId:ctx.session.user.id
            }
        });
    }),

    getOne: protectedProcedure.input(z.object({
        bookId: z.string(),
    })).query(async({ctx,input})=>{
        const book = await ctx.prisma.book.findUnique({
            where:{
                id:input.bookId
            }
        })
        return book
    })
    
})
