import * as React from 'react';
import {observable} from 'mobx';
import { Schema, DataItem, DataArr } from './schema';
import { UiForm as UiSchema } from './uiSchema';
import { factory } from './widgets';

export interface FormContextValue {
    form: Form;
    //readonly schema: Schema;
    readonly dict: {[name:string]: DataItem};
    readonly uiSchema: UiSchema;
    readonly data: any;
}
export const FormContext = React.createContext<FormContextValue>({} as any);

export interface FormProps {
    className?: string;
    schema: Schema;
    uiSchema: UiSchema;
    formData?: any;
}

export class Form extends React.Component<FormProps> {
    readonly schema: Schema;
    readonly dict: {[name:string]: DataItem};
    readonly uiSchema: UiSchema;
    @observable readonly data:any;
    constructor(props:FormProps) {
        super(props);
        let {schema, uiSchema, formData} = props;
        this.schema = schema;
        this.dict = {};
        this.uiSchema = uiSchema;
        this.data = {};
        if (formData === undefined) formData = {};
        for (let di of schema) {
            let {name, type} = di;
            this.dict[name] = di;
            if (type === 'arr') {
                let arrItem:DataArr = di as DataArr;
                let {arr:arrItems} = arrItem;
                if (arrItems === undefined) continue;
                let arrDict = arrItem.dict = {};
                for (let item of arrItems) {
                    arrDict[item.name] = item;
                }
                let val:any[] = formData[name];
                if (val === undefined) val = [{}];
                else if (Array.isArray(val) === false) val = [val];
                let arr:any[] = [];
                for (let row of val) {
                    let r = {};
                    for (let item of arrItems) {
                        let {name:nm} = item;
                        let v = row[nm];
                        if (v === undefined) v = null;
                        r[nm] = v;
                    }
                    arr.push(r);
                }
                this.data[name] = observable(arr);
            }
            else {
                this.data[name] = formData[name];
            }
        }
    }

    private rendContent() {
        let {children} = this.props;
        if (children !== undefined) return children;
        return this.schema.map((v, index) => {
            return <React.Fragment key={index}>{factory(this, v, this.uiSchema[v.name], this.data, children)}</React.Fragment>
        });
    }

    private addClick = () => {
        let arr1 = this.data['arr1'];
        arr1.push({});
    }

    private showClick = () => {
        alert(JSON.stringify(this.data));
    }

    render() {
        return <FormContext.Provider value={{form: this, /*schema: this.schema, */ dict: this.dict, uiSchema: this.uiSchema, data: this.data }}>
            <form className={this.props.className}>
                {this.rendContent()}
                <div>
                    <button type="button" onClick={this.addClick}>++++</button>
                </div>
                <div>
                    <button type="button" onClick={this.showClick}>Show Data</button>
                </div>
            </form>
        </FormContext.Provider>;
    }
}
