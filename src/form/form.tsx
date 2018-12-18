import * as React from 'react';
import {observable} from 'mobx';
import classNames from 'classnames';
import { Schema, ItemSchema, ArrSchema } from './schema';
import { UiSchema, UiArr, UiItem } from './uiSchema';
import { factory } from './widgets';
import 'font-awesome/css/font-awesome.min.css';

export interface ContextValue {
    readonly form: Form;
    //readonly itemSchemas: {[name:string]: ItemSchema};
    readonly uiSchema: UiSchema;
    readonly data: any;
    readonly inNode: boolean;           // true: 在</> 流中定义Field
    readonly arrSchema: ArrSchema;
}
export const FormContext = React.createContext<ContextValue>({} as any);
export type FormButtonClick = (name:string, data:any, arr?:string, row?:any) => void;

export interface FormProps {
    className?: string;
    schema: Schema;
    uiSchema: UiSchema;
    formData?: any;
    onButtonClick?: FormButtonClick;
    Container?: (content:JSX.Element) => JSX.Element;
    FieldContainer?: (label:any, content:JSX.Element, diArr?:ArrSchema, uiArr?:UiArr) => JSX.Element;
    FieldClass?: string;
    ArrContainer?: (label:any, content:JSX.Element) => JSX.Element;
    RowContainer?: (content:JSX.Element) => JSX.Element;
    ArrFieldContainer?: (label:any, content:JSX.Element, diArr?:ArrSchema, uiArr?:UiArr) => JSX.Element;
    RowEditContainer?: (content:JSX.Element, selectable?:boolean, deletable?:boolean, restorable?:boolean) => JSX.Element;
    ButtonClass?: string;
    RowSeperator?: JSX.Element;
}

export class Form extends React.Component<FormProps> {
    readonly schema: Schema;
    readonly itemSchemas: {[name:string]: ItemSchema};
    readonly uiSchema: UiSchema;
    readonly Container: (content:JSX.Element) => JSX.Element;
    readonly FieldContainer: (label:any, content:JSX.Element, diArr?:ArrSchema, uiArr?:UiArr) => JSX.Element;
    readonly FieldClass: string;
    readonly ArrContainer: (label:any, content:JSX.Element) => JSX.Element;
    readonly RowContainer: (content:JSX.Element) => JSX.Element;
    readonly ArrFieldContainer: (label:any, content:JSX.Element, diArr?:ArrSchema, uiArr?:UiArr) => JSX.Element;
    readonly RowEditContainer: (content:JSX.Element, selectable?:boolean, deletable?:boolean, restorable?:boolean) => JSX.Element;
    readonly ButtonClass: string;
    readonly RowSeperator: JSX.Element;
    @observable readonly data:any;

    constructor(props:FormProps) {
        super(props);
        let {schema, uiSchema, formData, 
            Container, FieldContainer, FieldClass, 
            ArrContainer, RowContainer, ArrFieldContainer, RowEditContainer,
            ButtonClass, RowSeperator
        } = props;
        this.Container = Container || this.DefaultContainer;
        this.FieldContainer = FieldContainer || this.DefaultFieldContainer;
        this.FieldClass = FieldClass || this.DefaultFieldClass;
        this.ArrContainer = ArrContainer || this.DefaultArrContainer;
        this.RowContainer = RowContainer || this.DefaultRowContainer;
        this.ArrFieldContainer = ArrFieldContainer || this.DefaultArrFieldContainer;
        this.RowEditContainer = RowEditContainer || this.DefaultRowEditContainer;
        this.ButtonClass = ButtonClass || this.DefaultButtonClass;
        this.RowSeperator = RowSeperator || this.DefaultRowSeperator;
        this.schema = schema;
        this.itemSchemas = {};
        this.uiSchema = uiSchema;
        this.data = {};
        if (formData === undefined) formData = {};
        for (let itemSchema of schema) {
            let {name, type} = itemSchema;
            this.itemSchemas[name] = itemSchema;
            if (type === 'button') {
            }
            else if (type === 'arr') {
                let arrItem:ArrSchema = itemSchema as ArrSchema;
                let {arr:arrItems} = arrItem;
                if (arrItems === undefined) continue;
                let arrDict = arrItem.itemSchemas = {};
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

    render() {
        let content:JSX.Element, inNode:boolean;
        let {children} = this.props;
        if (children !== undefined) {
            inNode = true;
            content = <>{children}</>;
        }
        else {
            let Templet: React.StatelessComponent;
            if (this.uiSchema !== undefined) {
                Templet = this.uiSchema.Templet;
            }
            if (Templet !== undefined) {
                inNode = true;
                content = <Templet />;
            }
            else {
                inNode = false;
                content = <>{this.schema.map((v, index) => {
                    let {name} = v;
                    let that = this;
                    let uiItem: UiItem;
                    if (that.uiSchema) {
                        let {items} = that.uiSchema;
                        if (items) uiItem = items[name];
                    }
                    return <React.Fragment key={index}>{factory(that, undefined, v, uiItem, that.data, children, false)}</React.Fragment>
                })}</>;
            }
        }
        return <FormContext.Provider value={{form: this, itemSchemas: this.itemSchemas, uiSchema: this.uiSchema, data: this.data, inNode:inNode, arrSchema:undefined }}>
            {this.Container(content)}
        </FormContext.Provider>;
    }

    protected DefaultContainer = (content:JSX.Element): JSX.Element => {
        return <form className={classNames(this.props.className)}>
            {content}
        </form>;
    }
    protected DefaultArrFieldContainer = (label:any, content:JSX.Element, diArr:ArrSchema, uiArr:UiArr): JSX.Element => {
        return <div className="col"><div className="form-group">
            <label>{label}</label>
            {content}
        </div></div>;
    }
    protected DefaultFieldContainer = (label:any, content:JSX.Element, diArr?:ArrSchema, uiArr?:UiArr): JSX.Element => {
        if (diArr !== undefined) {
            return this.ArrFieldContainer(label, content, diArr, uiArr);
        }
        return <div className="form-group">
            <label>{label}</label>
            {content}
        </div>;
    }
    protected DefaultFieldClass = 'form-control';
    protected DefaultArrContainer = (label:any, content:JSX.Element): JSX.Element => {
        return <div>
            <div className={classNames('small text-muted text-center bg-light py-1 px-3 mt-4 mb-1')}>{label}</div>
            {content}
        </div>;
    }
    protected DefaultRowContainer = (content:JSX.Element): JSX.Element => {
        return <div className="row">{content}</div>;
    }
    protected DefaultRowEditContainer = (content:JSX.Element, selectable?:boolean, deletable?:boolean, restorable?:boolean): JSX.Element => {
        if (selectable !== true && deletable !== true) return content;
        let left, right;
        if (selectable === true) {
            left = <div>L</div>;
        }
        if (deletable === true) {
            right = <div>R</div>;
        }
        return <div className="border border-success d-flex">
            {left}{content}{right}
        </div>;
    }
    protected DefaultButtonClass = 'btn';
    protected DefaultRowSeperator = <div className="border border-light border-top my-3" />;
}
