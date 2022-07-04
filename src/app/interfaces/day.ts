import { PantryItem } from "./pantry-item";

export interface Day {
    day? : number;
    items: PantryItem[];
}