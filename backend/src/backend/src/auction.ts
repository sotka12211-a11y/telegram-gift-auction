import { lots } from "./lots";
import { getUserByName } from "./users";

export function checkAuctions() {
  const now = Date.now();

  lots.forEach(lot => {
    if (lot.endsAt <= now && lot.owner) {
      const user = getUserByName(lot.owner);
      if (!user) return;

      user.balance -= lot.price;

      console.log("🎉 AUCTION FINISHED");
      console.log(`🏆 Winner: ${user.name}`);
      console.log(`🎁 Lot: ${lot.title}`);
      console.log(`💰 Paid: ${lot.price}`);
      console.log(`💳 Balance left: ${user.balance}`);

      // обновляем лот
      lot.resale = true;
      lot.owner = user.name;
      lot.endsAt = Date.now() + 60000;
      lot.price = Math.floor(lot.price * 1.1);
    }
  });
}
