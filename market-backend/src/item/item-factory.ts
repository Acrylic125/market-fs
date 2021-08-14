import Item from './item';
import ItemType from './item-type';
import { getItemType } from './item-type-registry';

export interface ItemFactoryOptions {
    type: string,
    data: any
}

export function createItem(options: ItemFactoryOptions): Item {
    const { data, type } = options;
    const itemType = getItemType(type);
    if (type) 
        return createItemWithItemType(data, (itemType as ItemType<Item>));
    throw Error(`${type} is not a registered Item Type.`);
}

export function createItemWithItemType(data: any, type: ItemType<Item>): Item {
    if (type.validateData(data))
        return type.parseData(data);
    throw Error(`${JSON.stringify(data, null, 2)} is invalid for the type, '${type}'.`);
}