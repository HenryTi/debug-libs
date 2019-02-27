var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import '../css/va-row.css';
var ListRow = /** @class */ (function (_super) {
    __extends(ListRow, _super);
    function ListRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pressed: false,
        };
        return _this;
    }
    ListRow.prototype.render = function () {
        var _a = this.props, date = _a.date, main = _a.main, vice = _a.vice, middle = _a.middle, midSize = _a.midSize, icon = _a.icon, unread = _a.unread, right = _a.right, onClick = _a.onClick;
        var header, isIcon, noteNum;
        if (unread !== undefined) {
            var uv = void 0;
            if (typeof unread === 'number')
                uv = unread;
            else
                uv = unread.get();
            if (uv > 0)
                noteNum = React.createElement("b", null, uv);
            else if (uv < 0)
                noteNum = React.createElement("b", { className: 'dot' });
        }
        switch (typeof icon) {
            case 'object':
                header = React.createElement("header", null,
                    icon,
                    noteNum);
                isIcon = false;
                break;
            case 'string':
                header = React.createElement("header", { className: 'icon' },
                    React.createElement("img", { src: icon }),
                    noteNum);
                isIcon = true;
                break;
        }
        var mid;
        if (middle !== undefined) {
            switch (typeof middle) {
                case 'string':
                    mid = React.createElement("div", { style: { flex: midSize } }, middle);
                    break;
                default:
                    mid = middle;
                    break;
            }
        }
        var footer;
        if (right !== undefined) {
            if (typeof right === 'string')
                footer = React.createElement("footer", null,
                    React.createElement("small", { className: "text-muted" }, right));
            else
                footer = React.createElement("footer", null, right);
        }
        var viceSpan;
        if (vice !== undefined)
            viceSpan = React.createElement("span", null, vice);
        var cn = classNames('va-row', { icon: isIcon, pressed: this.state.pressed }, { "va-action": onClick !== undefined });
        return (React.createElement("li", { className: cn, onClick: onClick },
            header,
            React.createElement("div", null,
                React.createElement("div", null, main),
                viceSpan),
            mid,
            footer));
    };
    ListRow = __decorate([
        observer
    ], ListRow);
    return ListRow;
}(React.Component));
export { ListRow };
//# sourceMappingURL=listRow.js.map