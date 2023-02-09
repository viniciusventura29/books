import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from 'zod'

export const notesRouter = createTRPCRouter({

    updateNote: protectedProcedure.input(z.object({
        body: z.string(),
        bookId: z.string()
    })).mutation(async ({ ctx, input }) => {
        const noteToUpdate = await ctx.prisma.notes.findFirst({
            where: {
                bookId: input.bookId
            }
        })

        if (!noteToUpdate) throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR"
        })

        const notes = ctx.prisma.notes.update({
            data: {
                body: input.body
            },
            where: {
                id: noteToUpdate.id
            }
        })
        return notes
    }),

    getNote: protectedProcedure.input(z.object({
        bookId: z.string()
    })).query(({ ctx, input }) => {
        const notes = ctx.prisma.notes.findFirst({where:{
            bookId: input.bookId
        }})
        return notes
    })
})