import legendaryCreatures from '@/data/cards/legendaryCreatures.json';

export function preprocessCards() {
    const creatureMap = new Map<string, string>();
    legendaryCreatures.forEach((creature) => {
        creatureMap.set(creature.id, creature.name);
    });
    return {legendaryCreatures};
} 
