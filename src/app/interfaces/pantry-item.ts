export interface PantryItem {
    name: string;
    section: string;
    id?: number;
    expirationDate?: Date;
    amount? : number;
    unit? : number;
}