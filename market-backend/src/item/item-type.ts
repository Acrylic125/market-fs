import Item from "./item";

export default interface ItemType<T extends Item> {
    id: string;
    parseData(data: any): T;
    validateData(data: any): boolean;
}

export class NormalItemType implements ItemType<Item> {
    
    constructor(public id: string) {}

    // Assert that the data is ValidityState.
    parseData(data: any): Item {
        return {
            cost: data.cost,
            quantityLeft: data.quantityLeft,
            name: data.name,
            description: data.description
        };
    }

    validateData(data: any): boolean {
        return data.cost && data.quantityLeft && data.name && data.description;
    }
}
