import { users } from "./users";
import { lots } from "./lots";

export function startBots() {
  setInterval(() => {
    const bots = users.filter(u => u.name.startsWith("Bot"));
    const bot = bots[Math.floor(Math.random() * bots.length)];
    const lot = lots[Math.floor(Math.random() * lots.length)];

    if (Date.now() > lot.endsAt) return;

    const bid = lot.price + Math.floor(Math.random() * 1000 + 300);
    if (bot.balance >= bid) {
      lot.price = bid;
      lot.owner = bot.name;
      console.log(`🤖 ${bot.name} bid ${bid} on ${lot.title}`);
    }
  }, 7000);
}
