# telegram-gift-auction
Demo implementation of Telegram Gift Auction mechanics (rounds, bids, anti-sniping)
# Telegram Gift Auction

Demo implementation of Telegram Gift Auction mechanics inspired by Telegram Gift Auctions.

## 🎯 Goal
Study Telegram Gift Auction mechanics and implement a backend-driven auction system without a detailed spec.
Product analysis and architecture decisions are part of the challenge.

## 🧩 Features
- Auction rounds with fixed duration
- Bidding with balance validation
- Anti-sniping (time extension on late bids)
- Automatic round transitions
- Bid history logging
- Protection from concurrent bid race conditions

## 🏗 Architecture
- Backend: **NestJS (Node.js + TypeScript)**
- Database: **MongoDB (Mongoose)**
- Atomic bid handling
- Stateless REST API
- In-memory locks / transactions for consistency

## 🚀 Getting Started

### Requirements
- Node.js 18+
- npm
- MongoDB (local or Docker)

### Install dependencies
```bash
npm install
