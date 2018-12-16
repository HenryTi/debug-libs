import * as React from 'react';
import {observable} from 'mobx';
import classNames from 'classnames';
import { Schema, DataItem, DataArr } from './schema';
import { UiForm as UiSchema, UiArr } from './uiSchema';
import { factory } from './widgets';

export interface FormContextValue {
    readonly form: Form;
    readonly dict: {[name:string]: DataItem};
    readonly uiSchema: UiSchema;
    readonly inNode: boolean;           // true: 在</> 流中定义Field
    readonly data: any;
    readonly diArr: DataArr;
}
export const FormContext = React.createContext<FormContextValue>({} as any);
export type FormButtonClick = (name:string, data:any, arr?:string, row?:any) => void;

export interface FormProps {
    className?: string;
    schema: Schema;
    uiSchema: UiSchema;
    formData?: any;
    onButtonClick?: FormButtonClick;
    Container?: (content:JSX.Element) => JSX.Element;
    FieldContainer?: (label:any, content:JSX.Element, diArr?:DataArr, uiArr?:UiArr) => JSX.Element;
    FieldClass?: string;
    ArrContainer?: (label:any, content:JSX.Element) => JSX.Element;
    RowContainer?: (content:JSX.Element) => JSX.Element;
    ArrFieldContainer?: (label:any, content:JSX.Element, diArr?:DataArr, uiArr?:UiArr) => JSX.Element;
    ButtonClass?: string;
    RowSeperator?: JSX.Element;
}

export class Form extends React.Component<FormProps> {
    readonly schema: Schema;
    readonly dict: {[name:string]: DataItem};
    readonly uiSchema: UiSchema;
    readonly Container: (content:JSX.Element) => JSX.Element;
    readonly FieldContainer: (label:any, content:JSX.Element, diArr?:DataArr, uiArr?:UiArr) => JSX.Element;
    readonly FieldClass: string;
    readonly ArrContainer: (label:any, content:JSX.Element) => JSX.Element;
    readonly RowContainer: (content:JSX.Element) => JSX.Element;
    readonly ArrFieldContainer: (label:any, content:JSX.Element, diArr?:DataArr, uiArr?:UiArr) => JSX.Element;
    readonly ButtonClass: string;
    readonly RowSeperator: JSX.Element;
    @observable readonly data:any;

    constructor(props:FormProps) {
        super(props);
        let {schema, uiSchema, formData, 
            Container, FieldContainer, FieldClass, 
            ArrContainer, RowContainer, ArrFieldContainer,
            ButtonClass, RowSeperator
        } = props;
        this.Container = Container || this.DefaultContainer;
        this.FieldContainer = FieldContainer || this.DefaultFieldContainer;
        this.FieldClass = FieldClass || this.DefaultFieldClass;
        this.ArrContainer = ArrContainer || this.DefaultArrContainer;
        this.RowContainer = RowContainer || this.DefaultRowContainer;
        this.ArrFieldContainer = ArrFieldContainer || this.DefaultArrFieldContainer;
        this.ButtonClass = ButtonClass || this.DefaultButtonClass;
        this.RowSeperator = RowSeperator || this.DefaultRowSeperator;
        this.schema = schema;
        this.dict = {};
        this.uiSchema = uiSchema;
        this.data = {};
        if (formData === undefined) formData = {};
        for (let di of schema) {
            let {name, type} = di;
            this.dict[name] = di;
            if (type === 'button') {
            }
            else if (type === 'arr') {
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

    render() {
        let content:JSX.Element, inNode:boolean;
        let {children} = this.props;
        if (children !== undefined) {
            inNode = true;
            content = <>{children}</>;
        }
        else {
            inNode = false;
            content = <>{this.schema.map((v, index) => {
                return <React.Fragment key={index}>{factory(this, undefined, v, this.uiSchema[v.name], this.data, children, false)}</React.Fragment>
            })}</>;
        }
        return <FormContext.Provider value={{form: this, dict: this.dict, uiSchema: this.uiSchema, data: this.data, inNode:inNode, diArr:undefined }}>
            {this.Container(content)}
        </FormContext.Provider>;
    }

    protected DefaultContainer = (content:JSX.Element): JSX.Element => {
        return <form className={classNames(this.props.className)}>
            {content}
        </form>;
    }
    protected DefaultArrFieldContainer = (label:any, content:JSX.Element, diArr:DataArr, uiArr:UiArr): JSX.Element => {
        return <div className="col"><div className="form-group">
            <label>{label}</label>
            {content}
        </div></div>;
    }
    protected DefaultFieldContainer = (label:any, content:JSX.Element, diArr?:DataArr, uiArr?:UiArr): JSX.Element => {
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
    protected DefaultButtonClass = 'btn';
    protected DefaultRowSeperator = <div className="border border-light border-top my-3" />;
}
