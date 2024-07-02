
export interface Player {
    id: number,
    name: string,
    commander: string;
}


export const playerData: Player[] = [
{
    id: 1,
    name: "Player 1",
    commander: "",
}, {
    id: 2,
    name: "Player 2",
    commander: "",
}, {
    id: 3, 
    name: "Player 3",
    commander: "",
}, {
    id: 4,
    name: "Player 4",
    commander: "",
}, {
    id: 5,
    name: "Player 5",
    commander: "",
}
];

export const updatePlayerData = (id: number, newName: string) => {
    const player = playerData.find(player => player.id === id)
    if (player) {
        player.name = newName;
    }
};

export const updateCommanderData = (id: number, newCommander: string) => {
    const player = playerData.find(player => player.id === id)
    if (player) {
        player.commander = newCommander;
    }
};

