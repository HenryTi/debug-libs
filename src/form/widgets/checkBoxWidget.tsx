import * as React from 'react';
import classNames from 'classnames';
import { TextWidget } from './textWidget';

export class CheckBoxWidget extends TextWidget {
    render() {
        return <input 
            className={this.className}
            type="checkbox"
            defaultValue={this.defaultValue} 
            onChange={this.onChange} />;
    }
}
