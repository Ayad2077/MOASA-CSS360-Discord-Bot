# Code Analysis Report

## Minheekim – Code Smells & Technical Debt

Code Smells & Technical Debt
Issue 1: Hardcoded Role Definitions in mafiaRole.js

Problem
All role data (name, faction, description, win condition) is stored as hardcoded objects inside the command file.

Impact
Changing game rules requires modifying source code and redeploying the bot.
This also prevents reuse of role data across other features such as help commands or game logic validation.

Recommendation
Move role definitions into a dedicated configuration or data module such as:

/data/roles.js

Then import it wherever needed.

Issue 2: Mixed Responsibilities in Command Files

(Seen in mafiaRole.js and role.js)

Problem
Command files handle multiple responsibilities:

game logic lookup
formatting output
UI response creation
business rules

Impact
Commands become difficult to test and modify.
Any change in game rules risks breaking message formatting.

Recommendation
Split into layers:

service layer (game logic)

presentation layer (Discord reply formatting)

Issue 3: Global Mutable Game State in gameState.js Usage

(Observed in role.js)

const role = playerRoles.get(interaction.user.id);


Problem
Game state is accessed directly from multiple modules without controlled access.

Impact
State corruption may occur when multiple commands modify or read the state simultaneously.
This makes debugging inconsistent game behavior difficult.

Recommendation
Encapsulate game state behind functions or a class:

getPlayerRole(userId)
setPlayerRole(userId, role)

### User Story

As a developer, I want game data and state logic separated from command handlers so that new features can be added without breaking existing gameplay.
