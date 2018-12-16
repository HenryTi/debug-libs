import * as React from 'react';
import classNames from 'classnames';
import { TextWidget } from './textWidget';

export class CheckBoxWidget extends TextWidget {
    render() {
        let fieldClass:string;
        if (this.inNode === false) fieldClass = this.form.FieldClass;
        return <input 
            className={classNames(fieldClass, this.ui && this.ui.className, this.className)}
            type="checkbox"
            defaultValue={this.defaultValue} 
            onChange={this.onChange} />;
    }
}
