import { users } from "./users";
import { lots } from "./lots";

export function startBots() {
  setInterval(() => {
    const bot = users[Math.floor(Math.random() * (users.length - 1)) + 1];
    const lot = lots[Math.floor(Math.random() * lots.length)];

    const bid = lot.price + Math.floor(Math.random() * 500 + 100);

    if (bot.balance >= bid) {
      lot.price = bid;
      lot.owner = bot.name;

      console.log(`🤖 ${bot.name} bid ${bid} on ${lot.title}`);
    }
  }, 7000);
}
