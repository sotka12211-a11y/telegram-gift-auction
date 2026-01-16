import { randomUUID } from 'crypto';

type User = { id: string; name: string; balance: number };
type Lot = { id: string; title: string; price: number; endsAt: number };
type Bid = { userId: string; amount: number };

const player: User = { id: 'player', name: 'You', balance: 20000 };

// ===== BOTS 3–5 =====
const botCount = Math.floor(Math.random() * 3) + 3;
const bots: User[] = Array.from({ length: botCount }).map((_, i) => ({
  id: `bot-${i}`,
  name: `Bot_${i + 1}`,
  balance: Math.floor(Math.random() * 15000) + 5000,
}));

const users = [player, ...bots];

// ===== LOTS =====
const lots = [
  '🚗 Tesla Model X',
  '🏠 Luxury House',
  '💎 Diamond Watch',
  '🏝️ Private Villa',
  '📱 iPhone 15 Pro',
];

let currentLot: Lot;
let currentBid: Bid | null = null;

// ===== CREATE LOT =====
function newLot(): Lot {
  return {
    id: randomUUID(),
    title: lots[Math.floor(Math.random() * lots.length)],
    price: Math.floor(Math.random() * 1000) + 500,
    endsAt: Date.now() + 20000, // 20 сек
  };
}

// ===== START =====
currentLot = newLot();
console.log(`🆕 NEW LOT: ${currentLot.title}`);

// ===== BID =====
function bid(user: User, amount: number) {
  if (amount <= currentLot.price) return;
  if (user.balance < amount) return;

  currentLot.price = amount;
  currentBid = { userId: user.id, amount };

  console.log(`💰 ${user.name} bids $${amount}`);
}

// ===== FINISH =====
function finish() {
  console.log(`\n🏁 FINISHED: ${currentLot.title}`);

  if (currentBid) {
    const winner = users.find(u => u.id === currentBid!.userId)!;
    winner.balance -= currentBid.amount;

    console.log(`🎉 WINNER: ${winner.name}`);
    console.log(`💳 BALANCE: $${winner.balance}`);
  } else {
    console.log('❌ No bids');
  }

  currentBid = null;
  currentLot = newLot();
  console.log(`\n🔁 NEW LOT: ${currentLot.title}`);
}

// ===== BOT ACTIVITY =====
setInterval(() => {
  bots.forEach(bot => {
    if (Math.random() < 0.4) {
      const inc = Math.floor(Math.random() * 300) + 100;
      bid(bot, currentLot.price + inc);
    }
  });
}, 2500);

// ===== TIMER =====
setInterval(() => {
  const left = Math.max(0, Math.floor((currentLot.endsAt - Date.now()) / 1000));
  process.stdout.write(`\r⏱ ${currentLot.title} | ${left}s | $${currentLot.price}   `);

  if (left === 0) finish();
}, 1000);

// ===== PLAYER DEMO =====
setTimeout(() => {
  bid(player, currentLot.price + 500);
}, 6000);

console.log('\n🚀 Auction started\n');
