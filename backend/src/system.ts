import { users } from "./users";
import { lots } from "./lots";
import { startBots } from "./bots";

export function startAuctionSystem() {
  console.log("📦 Lots loaded:", lots.length);
  console.log("👤 Users loaded:", users.length);

  startBots();
}
