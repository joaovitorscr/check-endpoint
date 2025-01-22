import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const ExampleRouter = createTRPCRouter({
  hello: protectedProcedure.query(({ ctx }) => {
    return {
      greeting: `Hello! ${ctx.userId}`,
    };
  }),
});
