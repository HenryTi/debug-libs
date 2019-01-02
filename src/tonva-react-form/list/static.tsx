import * as React from 'react';
import * as classNames from 'classnames';
import {ListBase} from './base';

export class Static extends ListBase {
    render(item:any, index:number):JSX.Element {
        let {className, key, render} = this.list.props.item;
        if (typeof item === 'string') {
            let cn = classNames('va-list-gap', 'px-3', 'pt-1');
            return <li className={cn}>{item}</li>;
        }
        return <li className={classNames(className)}>
            {this.renderContent(item, index)}
        </li>
    }
}
