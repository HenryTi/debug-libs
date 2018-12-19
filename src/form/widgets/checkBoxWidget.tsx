import * as React from 'react';
import classNames from 'classnames';
import { TextWidget } from './textWidget';

export class CheckBoxWidget extends TextWidget {
    protected input: HTMLInputElement;

    protected setElementValue(value:any) {this.input.checked = value}
    protected onBlur:any = undefined;

    render() {
        return <div className="form-control d-flex border-0"><input
            ref={(input)=>this.input = input}
            className={classNames(this.className, 'align-self-center')}
            type="checkbox"
            style={{maxHeight:"1.2em"}}
            defaultValue={this.defaultValue} 
            onChange={this.onChange} />
        </div>;
    }
}
