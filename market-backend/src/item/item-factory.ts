import Item from './item';

export type ItemType = 'normal' | 'unknown';

export function createItem(data: any, type: ItemType): Item {
    switch (type) {
        case 'normal': return createNormalItem(data);
        default:
            throw Error(`${type} is not a supported item type.`);
    }
}

export function isValidBaseItemData(data: any): boolean {
    return data.cost && data.quantityLeft && data.name && data.description;
}

export function createNormalItem(data: any): Item {
    if (isValidBaseItemData(data)) 
        return data;
    throw Error(`${JSON.stringify(data, null, 2)} is an invalid Normal Item. Check if the data provided matches with the required item attributes.`);
}