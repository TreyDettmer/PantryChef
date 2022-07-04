import { PantryItem } from "./pantry-item";

export interface RecipeItem {
    name: string;
    ingredients? : PantryItem[];
    description? : string;
    image? : string;
}