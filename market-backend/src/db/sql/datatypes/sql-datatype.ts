const i1 = 1;
const i8 = (2 << 7) - 1;
const i16 = (2 << 15) - 1;
const i24 = (2 << 23) - 1;
const i32 = 4294967295;

export interface SQLDataType {
    readonly typeName: string,
    isObjectInstanceOf(obj: any): boolean
    formatObjectToSQLString(obj: any): string
}

class SQL_String implements SQLDataType {
    constructor(public typeName: string, public size: number) {}

    public isObjectInstanceOf(obj: any): boolean {
        return (typeof(obj) === 'string') && obj.length <= this.size;
    }

    public formatObjectToSQLString(obj: any): string {
        return obj;
    }
}

export function newSQLCharType(size: number = i1) {
    if (size < i1 || size > i8)
        throw new Error(`CHAR(${size}) can only be between ${i1} and ${i8}.`);
    return new SQL_String(`CHAR(${size})`, size);
}

export function newSQLVarCharType(size: number = i16) {
    if (size < i1 || size > i16)
        throw new Error(`VARCHAR(${size}) can only be between ${i1} and ${i16}.`);
    return new SQL_String(`VARCHAR(${size})`, size);
}

export function newSQLTinyTextType() {
    return new SQL_String(`TINYTEXT`, i8);
}

export function newSQLTextType(size: number = i16) {
    if (size < i1 || size > i16)
        throw new Error(`TEXT(${size}) can only be between ${i1} and ${i16}.`);
    return new SQL_String(`TEXT(${size})`, size);
}

export function newSQLMediumTextType() {
    return new SQL_String(`MEDIUMTEXT`, i24);
}

export function newSQLLongTextType() {
    return new SQL_String(`MEDIUMTEXT`, i32);
}

export const SQL_CHAR = newSQLCharType();
export const SQL_VARCHAR = newSQLVarCharType();
export const SQL_TINYTEXT = newSQLTinyTextType();
export const SQL_TEXT = newSQLTextType();
export const SQL_MEDIUMTEXT = newSQLMediumTextType();
export const SQL_LONGTEXT = newSQLLongTextType();

export class SQL_Enum implements SQLDataType {
    public readonly typeName: string = "";

    constructor(public size: number) {}

    public isObjectInstanceOf(obj: any): boolean {
        return (typeof(obj) === 'string') && obj.length <= this.size;
    }

    public formatObjectToSQLString(obj: any): string {
        return obj;
    }
}