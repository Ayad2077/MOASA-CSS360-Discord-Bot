# MOASA Discord Mafia Bot

A five-person software engineering project that turns the social-deduction game **Mafia** into an automated Discord experience. The bot manages game state, role-specific actions, day/night transitions, voting, player status, and persistent statistics.

**Course:** CSS 360 Software Engineering, University of Washington Bothell  
**Status:** Completed, Winter 2026

## What the Project Demonstrates

- Event-driven application design with Discord.js
- Centralized multiplayer game-state management
- Role-specific command logic and permissions
- Automated day/night phase transitions
- Button-based lobby and voting interactions
- Persistent player statistics and recent-game snapshots
- Input validation and safeguards against invalid game actions
- Team-based software development using Git and GitHub

## Core Gameplay

Players join a lobby and are assigned Mafia, Doctor, Fortune Teller, or Civilian roles. The bot coordinates private role actions at night, public voting during the day, elimination logic, win conditions, and game resets.

Important safeguards include:

- Preventing duplicate joins
- Blocking mid-game resets from normal player actions
- Tracking living and eliminated players
- Restricting eliminated players from participating in active game chat
- Validating actions by role and game phase
- Resetting state after a completed match

## Main Commands

| Command | Purpose |
|---|---|
| `/join` | Start or join a game lobby |
| `/role` | View your assigned role privately |
| `/kill <user>` | Mafia night action |
| `/save <user>` | Doctor night action |
| `/divine <user>` | Fortune Teller investigation |
| `/rules` | Display game rules |
| `/players` | Show current players and status |
| `/stats` | Show lifetime and recent-game statistics |
| `/reset` | Reset the game (admin) |

The project also includes button-based recruitment and voting flows.

## Technology

- JavaScript
- Node.js
- Discord.js
- esbuild
- Mocha / Chai
- Docker

## Project Structure

```text
src/
├── app.js              # Discord client and top-level event wiring
├── commands/           # Slash-command implementations
├── events/             # Discord event handlers
├── helpers/            # Shared game and utility logic
├── fuzz/               # Fuzz-testing related code
└── images/             # Game visuals
```

Additional project documentation is available in `ARCHITECTURE.md`, `CodeAnalysisReport.md`, and the `docs/` directory.

## Setup

Requirements:

- Node.js
- A Discord application and bot token

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```text
TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_id
```

Register slash commands and start the bot:

```bash
npm run register
npm start
```

The `.env`, build output, dependencies, and runtime `data/` directory are excluded from version control.

## Team

MOASA was developed by a five-person CSS 360 team:

- Mini
- Oliver
- Alexandra
- Sari
- Ayad

This repository is presented as a **team software-engineering project** rather than an individual build.
