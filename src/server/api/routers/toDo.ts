import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { check } from "prettier";

export const toDoRouter = createTRPCRouter({
  createToDo: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        check: z.boolean(),
        bookId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const toDoTask = ctx.prisma.toDo.create({
        data: {
          title: input.title,
          check: input.check,
          bookId: input.bookId,
        },
      });
      return toDoTask;
    }),

  updateCheck: protectedProcedure
    .input(
      z.object({
        check: z.boolean(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const toDoTask = ctx.prisma.toDo.update({
        data: { check: input.check },
        where: {
          id: input.id,
        },
      });
      return toDoTask;
    }),

  deleteTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async({ ctx, input }) => {
       await ctx.prisma.toDo.delete({
        where: {
          id: input.taskId,
        },
      });
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        BookId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const toDos = ctx.prisma.toDo.findMany({
        where: {
          bookId: input.BookId,
        },
      });
      return toDos;
    }),
});
