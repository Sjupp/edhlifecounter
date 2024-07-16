export interface player {
  id: number;
  name: string;
  commander: string;
  life: number;
  colors: string[];
}

export const defaultPlayer: player = {
  id: 0,
  name: "Name",
  commander: "Commander",
  life: 40,
  colors: ["#FFF"],
};

export const createNewPlayer = (index) => ({
  ...defaultPlayer,
  id: index,
  name: `Player ${index}`,
});

// export const playerData: Player[] = [
//   {
//     id: 1,
//     name: "Player 1",
//     commander: "",
//   },
//   {
//     id: 2,
//     name: "Player 2",
//     commander: "",
//   },
//   {
//     id: 3,
//     name: "Player 3",
//     commander: "",
//   },
//   {
//     id: 4,
//     name: "Player 4",
//     commander: "",
//   },
//   {
//     id: 5,
//     name: "Player 5",
//     commander: "",
//   },
// ];

export const updatePlayerData = (
  list: player[],
  id: number,
  newName: string
) => {
  const player = list.find((player) => player.id === id);
  if (player) {
    player.name = newName;
  }
};

export const updateCommanderData = (
  list: player[],
  id: number,
  newCommander: string
) => {
  const player = list.find((player) => player.id === id);
  if (player) {
    player.commander = newCommander;
  }
};
