import { fmt } from "telegraf/format";
import type { Command, Context } from "../../types";

export default <Command>{
  name: "start",
  description: "Start command.",
  fn: async (ctx: Context) => {
    await ctx.reply(fmt`
    Hello!! Welcome to GlicoLog Bot. I can help you to save and follow your glucose values.
   `);
  },
};
