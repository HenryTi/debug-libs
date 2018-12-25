import * as React from 'react';
//import {Media, PropGrid, Prop, FA, IconText, TonvaForm, FormRow, SubmitResult, Fields} from 'tonva-react-form';
import {nav, User, Page} from '../tonva-tools';
import {Prop, Media, IconText, FA, PropGrid} from '../tonva-react-form';
//import {store} from 'store';
import consts from '../consts';
//import mainApi from 'mainApi';
import {About} from './about';
import ChangePasswordPage from './changePassword';

class Me extends React.Component {
    private exit() {
        if (confirm('退出当前账号不会删除任何历史数据，下次登录依然可以使用本账号')) {
            nav.logout();
        }
    }
    private about = () => {
        let right = <button className='btn btn-success btn-sm' onClick={this.showLogs}>log</button>;
        nav.push(<Page header="关于同花" right={right}>
            <About />
        </Page>);
    }
    
    private showLogs() {
        nav.push(<Page header="Logs">
            {nav.logs.map((v,i) => {
                return <div key={i} className="px-3 py-1">{v}</div>;
            })}
        </Page>);
    }
    
    private changePassword = () => {
        nav.push(<ChangePasswordPage />);
    }
    render() {
        const {user} = nav;
        let rows:Prop[] = [
            '',
            {
                type: 'component', 
                component: <Media icon={consts.appIcon} main={user.name} discription={String(user.id)} />
            },
            '',
            {
                type: 'component', 
                component: <IconText iconClass="text-info" icon="envelope" text="修改密码" />,
                onClick: this.changePassword
            },
            '',
            {
                type: 'component', 
                component: <IconText iconClass="text-info" icon="envelope" text="关于同花" />,
                onClick: this.about
            },
            '',
            '',
            {
                type: 'component', 
                bk: '', 
                component: <button className="btn btn-danger w-100" onClick={this.exit}>
                    <FA name="sign-out" size="lg" /> 退出登录
                </button>
            },
        ];
        return <PropGrid rows={rows} values={{}} />;
    }
}

export default Me;
