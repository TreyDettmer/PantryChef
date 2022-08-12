import { PantryItem } from "./pantry-item";

export interface RecipeItem {
    name: string;
    ownedIngredients? : PantryItem[];
    missingIngredients? : string[];
    id: string;
    image? : string;
}