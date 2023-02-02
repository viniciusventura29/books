import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/user";
import { bookRouter } from "./routers/books";
import { toDoRouter } from "./routers/toDo";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  book: bookRouter,
  toDo: toDoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
