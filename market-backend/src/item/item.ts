
export default interface Item {
    cost: number,
    quantityLeft: number,
    name: string,
    description: string
}

export interface ItemB extends Item {
    dd: string
}