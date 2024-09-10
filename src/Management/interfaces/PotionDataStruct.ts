
export type POTION_TYPE = "RED" | "GREEN" | "BLUE";

export interface PotionDataStruct {
    key: string;
    displayName: string;
    slotA: POTION_TYPE;
    slotB: POTION_TYPE;
    slotC: POTION_TYPE;
    sprite: string;
}