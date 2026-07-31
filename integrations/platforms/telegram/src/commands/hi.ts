import { fmt } from "telegraf/format";
import type { Context } from "../types";

const hi = async (ctx: Context) => {
  console.log(ctx.message);
  await ctx.reply(fmt`
    Hello!! Welcome to GlicoLog Bot. I can help you to save and follow your glucose values.
   `);
};

export default hi;
