import { MeasuringUnits } from "./measuring-units";

export interface PantryItem {
    name: string;
    section: string;
    id?: number;
    expirationDate?: Date;
    amount : number;
    unit : {amount : number, name : string};
}