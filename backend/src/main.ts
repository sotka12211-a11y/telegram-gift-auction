import { randomUUID } from 'crypto';

// ===== TYPES ===== type User = { id: string; name: string; balance: number }; type Lot = { id: string; title: string; price: number; endsAt: number; owner?: string }; type Bid = { userId: string; amount: number };

// ===== USERS & BOTS ===== const player: User = { id: 'player', name: 'You', balance: 10000 };

const botCount = Math.floor(Math.random() * 3) + 3; // 3–5 bots const bots: User[] = Array.from({ length: botCount }).map((_, i) => ({ id: bot-${i}, name: Bot ${i + 1}, balance: Math.floor(Math.random() * 8000) + 3000, }));

const users = [player, ...bots];

// ===== LOTS ===== const baseLots = [ '🚗 Tesla Model X', '🏠 Luxury House', '💎 Diamond Watch', '🏝️ Private Villa', '📱 iPhone Ultra', ];

let currentLot: Lot = createLot(); let currentBid: Bid | null = null;

// ===== FUNCTIONS ===== function createLot(): Lot { return { id: randomUUID(), title: baseLots[Math.floor(Math.random() * baseLots.length)], price: Math.floor(Math.random() * 500) + 500, endsAt: Date.now() + 30000, // 30 sec }; }

function placeBid(user: User, amount: number) { if (user.balance < amount) return; if (amount <= currentLot.price) return;

currentLot.price = amount; currentBid = { userId: user.id, amount }; console.log(💰 ${user.name} bids ${amount}); }

function finishAuction() { console.log(\n🏁 AUCTION FINISHED: ${currentLot.title});

if (currentBid) { const winner = users.find(u => u.id === currentBid!.userId)!; winner.balance -= currentBid.amount; currentLot.owner = winner.name;

console.log(`🎉 WINNER: ${winner.name}`);
console.log(`💳 New balance: ${winner.balance}`);

} else { console.log('❌ No bids placed'); }

console.log('🔁 Starting new lot...\n'); currentLot = createLot(); currentBid = null; }

// ===== BOT LOGIC ===== setInterval(() => { bots.forEach(bot => { if (Math.random() < 0.3) { const inc = Math.floor(Math.random() * 200) + 50; placeBid(bot, currentLot.price + inc); } }); }, 3000);

// ===== TIMER (INVERTER) ===== setInterval(() => { const left = Math.floor((currentLot.endsAt - Date.now()) / 1000); process.stdout.write(\r⏱ ${currentLot.title} | ${left}s | ${currentLot.price} );

if (left <= 0) { finishAuction(); } }, 1000);

// ===== PLAYER EXAMPLE BID ===== setTimeout(() => { placeBid(player, currentLot.price + 300); }, 7000);

console.log('🚀 Auction system started');

