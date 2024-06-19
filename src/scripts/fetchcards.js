import fs from "fs";
import { Power } from "lucide-react";
import * as Scry from "scryfall-sdk";

async function fetchCards() {
  const cards = [];

  try {
    await new Promise((resolve, reject) => {
      Scry.Cards.search("type:legendary type:creature")
        .on("data", (card) => {
          cards.push({
            id: card.id,
            name: card.name,
            power: card.power,
            image: card.image,
            toughness: card.toughness,
            cmc: card.cmc,
            manaCost: card.mana_cost,
            type: card.type,
            colorIdentity: card.color_identity,
            colors: card.colors,
            oracleText: card.oracle_text,
          });
        })
        .on("end", () => {
          console.log("done");
          console.log(cards.length);
          resolve();
        })
        .on("error", (err) => {
          console.error("Error fetching cards:", err);
          reject(err);
        });
    });

    fs.writeFileSync(
      "src/data/cards/legendaryCreatures.json",
      JSON.stringify(cards, null, 2)
    );
  } catch (err) {
    console.error("Error fetching cards:", err);
  }
}

fetchCards();
