import * as React from 'react';
import { Page, nav } from 'tonva-tools';
export class About extends React.Component {
    constructor() {
        super(...arguments);
        this.showLogs = () => {
            nav.push(React.createElement(Page, { header: "Logs" },
                React.createElement("div", null,
                    "NODE_ENV: ",
                    process.env.NODE_ENV),
                nav.logs.map((v, i) => {
                    return React.createElement("div", { key: i, className: "px-3 py-1" }, v);
                })));
        };
    }
    render() {
        let right = React.createElement("button", { className: 'btn btn-success btn-sm', onClick: this.showLogs }, "log");
        return React.createElement(Page, { header: "\u5173\u4E8E\u540C\u82B1", right: right },
            React.createElement("div", { className: 'm-3' }, "\u540C\u82B1"));
    }
}
//# sourceMappingURL=about.js.map