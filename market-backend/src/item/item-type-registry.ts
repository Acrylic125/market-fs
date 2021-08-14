import Item from "./item";
import ItemType, { NormalItemType } from "./item-type";

const registry = new Map<string, ItemType<Item>>();
export default registry;

function formatSafeID(id: string) {
    return id.toLocaleLowerCase();
}

export function registerItemType(type: ItemType<Item>) {
    registry.set(formatSafeID(type.id), type);
}

export function getItemType(typeID: string): ItemType<Item> | undefined {
    return registry.get(formatSafeID(typeID));
}

registerItemType(new NormalItemType("normal"));