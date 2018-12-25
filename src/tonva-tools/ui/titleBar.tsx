import * as React from 'react';
import _ from 'lodash';
import {nav, mobileHeaderStyle} from './nav';

export interface TitleBarProps {
    back?: 'back' | 'close' | 'none';
    center: string | JSX.Element;
    right?: JSX.Element;
    logout?: boolean | (()=>void);
}
export interface TitleBarState {
    hasBack: boolean;
}
export class TitleBar extends React.Component<TitleBarProps, TitleBarState> {
    private navChangeHandler: ()=>void;
    constructor(props) {
        super(props);
        this.navChange = this.navChange.bind(this);
        this.state = {
            hasBack: false,
        };
    }
    navChange() {
        this.setState({
            hasBack: nav.level > 1
        })
    }
    componentWillMount() {
        this.navChange();
        //this.navChangeHandler = nav.events.add('change', this.navChange);
    }
    componentWillUnmount() {
        //nav.events.remove('change', this.navChangeHandler);
    }
    async back() {
        await nav.back(); // 这个才会显示confirm box，在dataForm里面，如果输入了数据的话
    }
    openWindow() {
        window.open(document.location.href);
    }
    private logoutClick = () => {
        if (confirm('Really want to logout?') === false) return;
        let {logout} = this.props;
        if (typeof logout === 'function') {
            logout(); 
        }
        nav.logout();
    }
    render() {
        let b = this.state.hasBack || self != top;
        let {right, center, logout} = this.props;
        let back, pop, debugLogout;
        if (logout !== undefined && self === top) {
            if (typeof logout === 'boolean' && logout === true
                || typeof logout === 'function')
            {
                let {nick, name} = nav.user;
                debugLogout = <div className="d-flex align-items-center">
                    <small className="text-light">{nick || name}</small>
                    <a className="dropdown-toggle btn btn-secondary btn-sm ml-2"
                        role="button"
                        onClick={this.logoutClick}>
                        <i className="fa fa-sign-out" />
                    </a>
                </div>;
            }
        }
        if (b) {
            switch (this.props.back) {
                case 'none': back = undefined; break;
                default:
                case 'back': back = <nav onClick={this.back}><i className="fa fa-arrow-left" /></nav>; break;
                case 'close': back = <nav onClick={this.back}><i className="fa fa-close" /></nav>; break;
            }
        }
        if (self != top) {
            console.log(document.location.href);
            pop = <header onClick={this.openWindow} />;
        }
        let rightView;
        if (right || debugLogout) rightView = <aside>{right} {debugLogout}</aside>;
        return (
        <header style={mobileHeaderStyle}>
            {pop}
            {back}
            <div>{center}</div>
            {rightView}
        </header>
        );
    }
}
