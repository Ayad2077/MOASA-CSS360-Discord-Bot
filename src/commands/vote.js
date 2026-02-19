import { SlashCommandBuilder } from "discord.js";
import { playerRoles, votes, currentPhase, alivePlayers } from "../helpers/gameState.js";

export default {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote to eliminate a player")
    .addUserOption(opt => 
      opt.setName("target")
        .setDescription("The person you think is Mafia")
        .setRequired(true)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;

    // Check if it's actually Day
    if (currentPhase !== "DAY") {
      return interaction.reply({ content: "You can only vote during the Day!", ephemeral: true });
    }

    // Check if the voter is alive
    if (!alivePlayers.has(userId)) {
      return interaction.reply({ content: "Ghost voices don't count! You are dead.", ephemeral: true });
    }

    const target = interaction.options.getUser("target");

    // Check if target is alive
    if (!alivePlayers.has(target.id)) {
      return interaction.reply({ content: "That player is already dead.", ephemeral: true });
    }

    // Record the vote
    votes.set(userId, target.id);
    
    await interaction.reply({ 
      content: `✅ Your vote for **${target.username}** has been recorded.`, 
      ephemeral: true 
    });

    // Public announcement
    await interaction.channel.send(`🗳️ **${interaction.user.username}** has cast a vote! (${votes.size}/${alivePlayers.size} votes cast)`);
  }
};