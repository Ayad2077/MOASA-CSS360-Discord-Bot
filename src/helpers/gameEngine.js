import { alivePlayers, setPhase, nightActions, playerRoles } from "./gameState.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const startNight = async (client, channel) => {
  setPhase("NIGHT");
  nightActions.mafiaTarget = null;
  nightActions.doctorTarget = null;

  await channel.send("🌙 **Night falls on the village.**\n" + 
                     "The Mafia and Doctor have **30 seconds** to act in their DMs!");

  // Playable loop
  let timer = 30;
  while (timer > 0) {
    // End night early if both roles have acted
    const hasMafia = [...playerRoles.values()].includes("Mafia");
    const hasDoctor = [...playerRoles.values()].includes("Doctor");
    
    const mafiaActed = !hasMafia || nightActions.mafiaTarget !== null;
    const doctorActed = !hasDoctor || nightActions.doctorTarget !== null;

    if (mafiaActed && doctorActed) break; 

    await sleep(1000);
    timer--;
  }

  await channel.send("⌛ **The sun begins to rise...**");
  await sleep(3000); // Dramatic pause
  await resolveNight(client, channel);
};

async function resolveNight(client, channel) {
  setPhase("DAY");
  const { mafiaTarget, doctorTarget } = nightActions;
  let killMessage = "";

  if (mafiaTarget) {
    if (mafiaTarget === doctorTarget) {
      killMessage = "🏥 **The Mafia attacked last night, but the Doctor saved the victim!** No one died.";
    } else {
      alivePlayers.delete(mafiaTarget);
      killMessage = `🩸 **Tragedy strikes!** <@${mafiaTarget}> was found dead. They were a **${playerRoles.get(mafiaTarget)}**.`;
    }
  } else {
    killMessage = "🕊️ **A quiet night.** Nothing happened...";
  }

  await channel.send(killMessage);
  
  // Day phase begins
  await channel.send("🗣️ **Day Phase:** Discuss and use `/vote` to find the Mafia!");
}