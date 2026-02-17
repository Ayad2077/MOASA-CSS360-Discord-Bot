import { SlashCommandBuilder } from "discord.js";
import { playerRoles, nightActions, currentPhase, alivePlayers } from "../helpers/gameState.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kill")
    .setDescription("Mafia: Eliminate a player")
    .addUserOption(opt => opt.setName("target").setDescription("Who to kill").setRequired(true)),

  async execute(interaction) {
    const userId = interaction.user.id;
    if (currentPhase !== "NIGHT") return interaction.reply({ content: "It's not night time!", ephemeral: true });
    if (playerRoles.get(userId) !== "Mafia") return interaction.reply({ content: "You aren't in the Mafia!", ephemeral: true });

    const target = interaction.options.getUser("target");
    if (!alivePlayers.has(target.id)) return interaction.reply({ content: "That player is already dead!", ephemeral: true });

    nightActions.mafiaTarget = target.id;
    await interaction.reply({ content: `🔪 You have targeted **${target.username}**.`, ephemeral: true });
  }
};