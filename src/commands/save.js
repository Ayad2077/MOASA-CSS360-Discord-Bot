import { SlashCommandBuilder } from "discord.js";
import { playerRoles, nightActions, currentPhase, alivePlayers } from "../helpers/gameState.js";

export default {
  data: new SlashCommandBuilder()
    .setName("save")
    .setDescription("Doctor: Protect a player")
    .addUserOption(opt => opt.setName("target").setDescription("Who to protect").setRequired(true)),

  async execute(interaction) {
    const userId = interaction.user.id;
    if (currentPhase !== "NIGHT") return interaction.reply({ content: "It's not night time!", ephemeral: true });
    if (playerRoles.get(userId) !== "Doctor") return interaction.reply({ content: "You aren't the Doctor!", ephemeral: true });

    const target = interaction.options.getUser("target");
    if (target.id === userId) return interaction.reply({ content: "You cannot save yourself!", ephemeral: true });

    nightActions.doctorTarget = target.id;
    await interaction.reply({ content: `🩺 You are protecting **${target.username}** tonight.`, ephemeral: true });
  }
};