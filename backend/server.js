import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// ===== USERS =====
const player = { id: 'player', name: 'You', balance: 20000 };

const bots = Array.from({ length: Math.floor(Math.random() * 3) + 3 }).map((_, i) => ({
  id: `bot-${i}`,
  name: `Bot_${i + 1}`,
  balance: Math.floor(Math.random() * 15000) + 5000,
}));

const users = [player, ...bots];

// ===== LOTS =====
const titles = [
  '🚗 Tesla Model X',
  '🏠 Luxury House',
  '💎 Diamond Watch',
  '🏝️ Private Villa',
  '📱 iPhone 15 Pro',
];

let lot = newLot();
let lastBid = null;

function newLot() {
  return {
    id: randomUUID(),
    title: titles[Math.floor(Math.random() * titles.length)],
    price: Math.floor(Math.random() * 1000) + 500,
    endsAt: Date.now() + 20000,
    winner: null,
  };
}

// ===== API =====
app.get('/state', (req, res) => {
  res.json({
    lot,
    lastBid,
    balance: player.balance,
    timeLeft: Math.max(0, Math.floor((lot.endsAt - Date.now()) / 1000)),
  });
});

app.post('/bid', (req, res) => {
  const { amount } = req.body;
  if (amount <= lot.price) return res.status(400).end();
  if (player.balance < amount) return res.status(400).end();

  lot.price = amount;
  lastBid = { user: player.name, amount };
  res.json({ ok: true });
});

// ===== BOTS =====
setInterval(() => {
  bots.forEach(bot => {
    if (Math.random() < 0.4 && Date.now() < lot.endsAt) {
      const inc = Math.floor(Math.random() * 300) + 100;
      lot.price += inc;
      lastBid = { user: bot.name, amount: lot.price };
    }
  });
}, 2500);

// ===== TIMER =====
setInterval(() => {
  if (Date.now() >= lot.endsAt) {
    if (lastBid) {
      if (lastBid.user === 'You') player.balance -= lot.price;
      lot.winner = lastBid.user;
    }
    lot = newLot();
    lastBid = null;
  }
}, 1000);

app.listen(PORT, () => {
  console.log(`🚀 Backend running http://localhost:${PORT}`);
});
