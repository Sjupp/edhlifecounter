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

export function addPlayerToList(list: player[]) {
  const newPlayer = {
    ...defaultPlayer,
    id: list.length, // not +1 due to 0-index
    name: `Player ${list.length}`,
  };

  list.push(newPlayer);
}

export function removePlayerFromList(list: player[]) {
  if (list.length > 0) list.pop();
}

export const removePlayer = (list: player[], id: number) => {
  setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
};

export function setAllPlayerHealth(list: player[], value: number) {
  list.forEach((element) => {
    element.life = value;
  });
}

export function changePlayerHealthBy(
  list: player[],
  playerId: number,
  changeValue: number
) {
  const player = list.find((player) => player.id === playerId);
  if (player) {
    player.life += changeValue;
  } else {
    console.log("did not find player by id " + playerId);
  }
}

//

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
