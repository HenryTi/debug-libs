import * as React from 'react';
import classNames from 'classnames';
import { UpdownWidget } from "tonva-tools/ui/form/widgets";
import { observable } from 'mobx';

const keys = [107, 109, 110, 187, 189];

export class MinusPlusWidget extends UpdownWidget {
    @observable protected value: any;
    @observable protected hasFocus: boolean;

    protected isValidKey(key:number):boolean {
        if (keys.find(v => v===key) !== undefined) return false;
        return super.isValidKey(key);
    }

    protected onBlur(evt: React.FocusEvent<any>) {
        super.onBlur(evt);
        this.hasFocus = false;
    }

    protected onFocus(evt: React.FocusEvent<any>) {
        super.onFocus(evt);
        this.hasFocus = true;
    }

    private minusClick = () => {
        let v = this.getValue();
        this.setValue(v - 1);
    }
    private plusClick = () => {
        let v = this.getValue();
        this.setValue(v + 1);
    }
    render() {
        let renderTemplet = this.renderTemplet();
        if (renderTemplet !== undefined) return renderTemplet;
        let cn = {
            //'form-control': true,
        };
        if (this.hasError === true) {
            cn['is-invalid'] = true;
        }
        else {
            cn['required-item'] = this.itemSchema.required === true;
        }
        let hasFocus = this.hasFocus; // document.hasFocus() && document.activeElement === this.input;
        let hasAction = this.readOnly !== true && this.disabled !== true;
        let hasValue = this.value !== NaN && this.value !== undefined && this.value > 0;
        let minus:any, plus:any, input:any;
        if (hasFocus === true || hasAction === true && hasValue === true) {
            minus = <i className="fa fa-minus-circle fa-2x text-danger cursor-pointer"
                    onClick={this.minusClick} />
        }
        if (hasFocus === true || hasValue === true) {
            input = <input ref={input=>this.input = input}
                className={classNames(this.className, cn, 'mx-1 w-4c form-control')}
                type="text"
                defaultValue={this.value} 
                onChange={this.onInputChange}
                placeholder={this.placeholder}
                readOnly={this.readOnly}
                disabled={this.disabled}
                onKeyDown = {this.onKeyDown}
                onFocus = {(evt)=>this.onFocus(evt)}
                onBlur={(evt)=>this.onBlur(evt)}
                maxLength={10} />;
        }

        if (hasAction === true) {
            plus = <i className="fa fa-plus-circle fa-2x text-danger cursor-pointer"
                onClick={this.plusClick} />;
        }
        return <>{minus}{input}{plus}
            {this.renderErrors()}
        </>;
    }
}
