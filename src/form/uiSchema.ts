export type UiType = 'arr' | 'group' | 'text' | 'textarea' | 'password' 
    | 'date' | 'datetime' | 'select' | 'url' | 'email'
    | 'updown' | 'color' | 'checkbox' | 'checkboxes' | 'radio' | 'range';

export interface UiItem {
    widget: UiType;
    readonly?: boolean;
    disabled?: boolean;
    label?: string;
}

export interface UiInputItem extends UiItem {
    placeholder?: string;
}

export interface UiTextItem extends UiInputItem {
    widget: 'text';
}

export interface UiTextAreaItem extends UiInputItem {
    widget: 'textarea';
    rows?: number;
}

export interface UiArr extends UiItem {
    widget: 'arr';
    items: {[field: string]: UiItem};
}

export interface UiGroup extends UiItem {
    widget: 'group';
    with: string[];     // field names
}

export interface UiForm {
    items: {
        [field: string]: UiItem;
    }
}
