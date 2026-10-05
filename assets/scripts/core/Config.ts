import { MERCENARY_COUNT } from './Mercenaries';
import { REFERENCE_SPELLS } from './ReferenceRules';
export const CONFIG = {
    version: 'independent-2026-10-02.1', stageBaseHP: 22, stageGrowth: 1.115,
    titansPerStage: 5, bossMultiplier: 8, bossSeconds: 30, goldBase: 6,
    prestigeStage: 60, petStage: 8, equipmentStage: 15, clanStage: 100,
    abyssStage: 1000, soulsStage: 100000, transcendStage: 180000,
    eggSeconds: 14400, maxOfflineSeconds: 28800, inventoryCap: 100,
    manaMax: 120, manaRegen: 1.5,
} as const;
export const HEROES = Array.from({
    length: MERCENARY_COUNT
}, (_, i) => ({
    id: i, name: `hero.${i}`, unlock: Math.max(1, i * 12), cost: 18 * Math.pow(12, i),
    damage: 2 * Math.pow(10, i), growth: 1.075,
}));
export const SPELLS = REFERENCE_SPELLS;
export const SKILLS = Array.from({
    length: 18
}, (_, i) => ({
    id: i, branch: Math.floor(i / 3), tier: i % 3, max: i % 3 === 2 ? 10 : 20, prerequisite: i % 3 ? i - 1 : -1
}));
export const ARTIFACTS = Array.from({
    length: 30
}, (_, i) => ({
    id: i, name: `artifact.${i}`, effect: i % 4
}));
export const PETS = Array.from({
    length: 12
}, (_, i) => ({
    id: i, name: `pet.${i}`, effect: i % 3
}));
export const CARDS = Array.from({
    length: 18
}, (_, i) => ({
    id: i, name: `card.${i}`, type: i % 3
}));
