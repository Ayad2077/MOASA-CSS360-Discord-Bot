## Event-Driven Architecture: User Onboarding (Welcome Message) - mini

### Overview
This section describes the event-driven architecture used by the bot to handle
user onboarding when a new member joins a Discord server.
Although this feature is not part of the Mafia game logic itself, it demonstrates
the same architectural pattern used throughout the bot, including the Mafia game commands.

---

### Feature Description
When a new user joins the server, the bot listens for the Discord `guildMemberAdd` event.
Once the event is triggered, the bot locates a configured text channel and sends a
welcome message along with an embedded meme image.

This feature improves user onboarding and confirms that the bot is active and responsive
before users participate in the Mafia game.

---

### Data Flow
1. A user joins the Discord server
2. Discord emits the `guildMemberAdd` event
3. The bot receives the event through the Discord Gateway
4. The bot searches for a target channel using an environment variable
5. A welcome message is generated
6. A meme image is embedded in the message
7. The message is sent to the selected channel

---

### Architecture Diagram (Data Flow Diagram)

The following data flow diagram illustrates how the bot handles user onboarding
using an event-driven architecture. When a new user joins the Discord server,
the Discord Gateway emits a `guildMemberAdd` event. The bot processes this event,
generates a welcome message with an embedded meme, and sends the message to a
configured text channel using environment-based configuration.


*(Insert Data Flow Diagram image here)*

---

### Relevant Code
- `src/events/guildMemberAdd.js`
- Uses Discord.js event handling
- Uses environment variables for configuration:
  - `CHANNEL_NAME`
  - `MEME_URL`

---

### Architectural Significance
This feature demonstrates the bot’s event-driven design, which is also used by
other components such as Mafia game commands and role assignment logic.
By separating event handling, configuration, and message generation, the bot
maintains modularity and extensibility.

Future features can reuse this pattern by registering additional events or commands
without modifying existing logic.


## mafia game --