import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { check } from "prettier";

export const toDoRouter = createTRPCRouter({
    createToDo: protectedProcedure.input(z.object({
        title: z.string(),
        check: z.boolean(),
        bookId: z.string()
    })).mutation(async ({ ctx, input }) => {
        const toDoTask = ctx.prisma.toDo.create({
            data: {
                title: input.title,
                check: input.check,
                bookId: input.bookId
            }
        })

        return toDoTask
    }),

    getAll: protectedProcedure.input(z.object({
        id: z.string()
    }))
    .query(({ctx,input})=>{
        const toDos = ctx.prisma.toDo.findMany({
            where:{
                id:input.id
            }
        })

        return toDos
    })
})