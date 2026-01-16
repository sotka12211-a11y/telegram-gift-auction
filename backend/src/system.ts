import { startBots } from "./bots";
import { checkAuctions } from "./auction";

export function startAuctionSystem() {
  console.log("🚀 Auction system started");

  startBots();

  setInterval(() => {
    checkAuctions();
  }, 1000);
}
