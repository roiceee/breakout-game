# Breakout Game  

## Overview  
**Breakout Game** is an educational game designed for Filipino high school students, commissioned by education researchers. The game challenges players to complete tracks within a set time limit. If time runs out, they must restart the game.  

This is a fully client-side **PWA** that works offline.  

## Tech Stack  
- **Frontend:** React (Vite) + TypeScript  
- **UI:** DaisyUI (Tailwind CSS)  
- **PWA:** Vite PWA Plugin  
- **Deployment:** Cloudflare  

## Features  
- Multiple game themes to choose from.  
- Timed tracks: Players must complete each track before the timer runs out.  
- Fully offline support with **PWA** capabilities.  

## Setup & Installation  
1. Clone the repository:  
   ```sh
   git clone <repo-url>
   cd breakout-game
   ```  
2. Install dependencies:  
   ```sh
   npm install  # or pnpm install
   ```  
3. Run the development server:  
   ```sh
   npm run dev
   ```  
   Open [http://localhost:5173](http://localhost:5173) in your browser.  

## Deployment  
- Deployed via **Cloudflare Pages**.  
- Built as a **fully client-side PWA** for offline access.  

## Usage  
1. Choose a **game theme**.  
2. Complete the track within the given time.  
3. If time runs out, restart and try again.  
4. The game supports offline play after the first load.  

## Troubleshooting  
- Ensure the game loads correctly as a **PWA** in your browser.  
- If deployment issues arise, check Cloudflare logs.  

## Maintainer  
This project is currently maintained by **[John Roice Aldeza](https://github.com/roiceee)**.  

---

Let me know if you need adjustments! 🚀
