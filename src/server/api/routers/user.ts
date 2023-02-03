import { z } from "zod";
import { createTRPCRouter,protectedProcedure,publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    createUser: publicProcedure
    .input(z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    }))
    .mutation(async({ctx, input})=>{
        const users = await ctx.prisma.user.create({
            data:{
                name:input.name,
                email:input.email,
                password: input.password,
            }
        })

        return users;
    }),

    getUserInfo: protectedProcedure
    .query(({ctx})=>{
        return ctx.prisma.user.findUnique({
            where:{
                id: ctx.session.user.id
            }
        })
    })
})
