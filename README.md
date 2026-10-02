# MOASA Discord Mafia Bot

A five-person software-engineering team project that automates the social-deduction game **Mafia** through Discord commands, role actions, day/night phases, voting, and player statistics.

**Course:** CSS 360 Software Engineering, University of Washington Bothell  
**Project period:** Winter 2026  
**Team:** Mini, Oliver, Alexandra, Sari, and Ayad  
**Repository context:** portfolio fork of the team project

## Project Highlights

- Event-driven command and event handling with Discord.js.
- Shared in-memory game state for player roles and phases.
- Mafia, Doctor, Fortune Teller, and Civilian gameplay.
- Recruitment and voting interactions.
- Local-file persistence for player statistics and recent-game results.
- Architecture diagrams, code analysis, and helper tests.

This is a team project. The repository preserves shared authorship; its features are not presented as an individual implementation.

## Start Exploring

- [Game engine](src/helpers/gameEngine.js): phase transitions, voting, and game resolution.
- [Shared game state](src/helpers/gameState.js): player and phase state.
- [Statistics](src/helpers/stats.js): local persistence.
- [Architecture documentation](ARCHITECTURE.md): diagrams and design notes.
- [Code analysis](CodeAnalysisReport.md): additional project analysis.

Some architecture notes describe earlier designs; consult the current source for exact paths and behavior.

## Main Commands

| Command | Purpose |
| --- | --- |
| `/join` | Start or join recruitment |
| `/role` | View your role |
| `/kill` | Mafia night action |
| `/save` | Doctor night action |
| `/divine` | Fortune Teller investigation |
| `/rules` | Show game rules |
| `/players` | List players and status |
| `/stats` | Show player statistics |
| `/reset` | Reset shared game state |

## Local Setup

Use **Linux, macOS, or WSL**: the build script uses `rm -rf` and shell globs. Native Windows shells require adapting that script.

You need Node.js/npm and a Discord application with a bot account.

```bash
git clone https://github.com/Ayad2077/MOASA-CSS360-Discord-Bot.git
cd MOASA-CSS360-Discord-Bot
npm ci
```

Create a local `.env` file:

```dotenv
TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_id
```

The client requests Guild Members and Message Content intents; enable the corresponding privileged intents in the Discord Developer Portal. Invite the bot to a test server with bot and application-command scopes and the channel permissions required by the features you exercise.

Register commands and start:

```bash
npm run register
npm start
```

The register script publishes commands for the configured Discord application. Use a dedicated test application/server when exploring the project.

## Tests

```bash
npm test
```

The repository includes Mocha/Chai tests for command loading and helpers. These do not establish complete multiplayer or live Discord integration coverage.

## Technology & Structure

**JavaScript · Node.js · Discord.js · esbuild · Mocha/Chai · Docker**

```text
src/
├── app.js              # Discord client
├── deploy-commands.js  # Slash-command registration
├── commands/           # Command modules
├── events/             # Discord event handlers
├── helpers/            # Game engine, state, statistics, and loaders
├── fuzz/               # Fuzz-related scripts
└── images/             # Game visuals
tests/                  # Helper and command-loading tests
docs/                   # Design artifacts
```

## Current Limitations

- Active game state is shared in memory; it is not isolated per Discord server.
- The `/reset` description says “admin only,” but its current handler does not enforce an administrator permission check.
- Statistics use local files rather than a database.
- Architecture documentation includes earlier command names and paths.
- Live gameplay requires a configured Discord bot and server.

The repository excludes `.env`, dependencies, build output, and runtime `data/` from version control.
