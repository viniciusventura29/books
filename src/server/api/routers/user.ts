import { z } from "zod";
import { createTRPCRouter,publicProcedure } from "../trpc";

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
                email:input.name,
                password: input.password
            }
        })

        return users;
    })
})
