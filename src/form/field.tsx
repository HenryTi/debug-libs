import * as React from 'react';
import { FormContext, FormContextValue, Form } from './form';
import { factory } from './widgets';
import { UiItem, UiArr } from './uiSchema';
import { DataArr } from './schema';

export interface FieldProps {
    name: string;
    className?: string;
    children?: React.ReactNode;
}

export class Field extends React.Component<FieldProps> {
    static contextType = FormContext;
    render() {
        let {name, className, children } = this.props;
        let {form, dict, uiSchema, data, inNode, diArr} = this.context as FormContextValue;
        if (form === undefined) return <span className="text-danger">!only in Form!</span>;
        let {dict: formDict} = form;
        let ui:UiItem;
        if (uiSchema) {
            let {items} = uiSchema;
            if (items !== undefined) ui = items[name]
        }
        let uiArr: UiArr;
        if (formDict !== dict) {
            uiArr = uiSchema as UiArr;
        }
        let content = factory(form, className, dict[name], ui, data, children, inNode, diArr, uiArr);
        if (content === undefined) {
            return <span className="text-danger">!!{name} is not defined!!</span>;
        }
        return content;
    }
}
