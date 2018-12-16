export type DataType = 'integer' | 'number' | 'string' | 'date' | 'boolean' | 'arr' | 'button';

export interface DataItem {
    name: string;
    required?: boolean;
    type: DataType;
}

export interface DataNumBase extends DataItem {
    type: 'integer' | 'number';
    min?: number;
    max?: number;
}

export interface DataInt extends DataNumBase {
    type: 'integer';
}

export interface DataNum extends DataNumBase {
    type: 'number';
}

export interface DataBool extends DataItem {
    type: 'boolean';
}

export interface DataString extends DataItem {
    type: 'string';
    maxLength?: number;
}

export interface DataDate extends DataItem {
    type: 'date';
}

export interface DataArr extends DataItem {
    type: 'arr';
    arr: DataItem[];
    dict: {[name:string]: DataItem};
}

export interface DataButton extends DataItem {
    type: 'button';
}

export type Schema = DataItem[];
