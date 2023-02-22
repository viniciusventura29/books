import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const notesRouter = createTRPCRouter({
  createNote: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        bookId: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.prisma.notes.create({
        data: {
          body: input.body,
          title: input.title,
          bookId: input.bookId,
          color: input.color,
        },
      });
      return note;
    }),

  deleteNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const note = ctx.prisma.notes.delete({
        where: {
          id: input.id,
        },
      });
      return note;
    }),

  updateNote: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        noteId: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const noteToUpdate = await ctx.prisma.notes.findFirst({
        where: {
          id: input.noteId
        },
      });

      if (!noteToUpdate)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });

      const note = await ctx.prisma.notes.update({
        data: {
          body: input.body,
          title: input.title,
          color: input.color,
        },
        where: {
          id: noteToUpdate.id,
        },
      });
      return { note };
    }),

  getOneNote: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const notes = ctx.prisma.notes.findFirst({
        where: {
          bookId: input.bookId,
        },
      });
      return notes;
    }),

  getAllNotes: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const notes = ctx.prisma.notes.findMany({
        where: {
          bookId: input.bookId,
        },
      });
      return notes;
    }),
});
