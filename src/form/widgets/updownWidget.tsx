import * as React from 'react';
import { TextWidget } from './textWidget';
import { NumberWidget } from './numberWidget';

export class UpdownWidget extends NumberWidget {
    protected inputType = 'number';
    protected onKeyDown = (evt:React.KeyboardEvent<HTMLInputElement>) => {
        let key = evt.keyCode;
        event.returnValue = key===46 || key===8 || key===37 || key===39
            || key>=48 && key<=57
            || key>=96 && key<=105;
    }
}
