import { createItem } from '../item/item-factory';

test('should create a normal item', () => {
    expect(createItem({
        cost: 3,
        quantityLeft: 10,
        name: "Test Item",
        description: "Some Realllly long description."
    }, 'normal')).toEqual({
        cost: 3,
        quantityLeft: 10,
        name: "Test Item",
        description: "Some Realllly long description."
    });
});

test('should fail to create a normal item (Due to incomplete data)', () => {
    expect(() => createItem({
        cost: 3,
        description: "Some Realllly long description."
    }, 'normal')).toThrowError();
});

test('should fail to create a normal item (Due to unknown type)', () => {
    expect(() => createItem({
        cost: 3,
        quantityLeft: 10,
        name: "Test Item",
        description: "Some Realllly long description."
    }, 'unknown')).toThrowError();
});