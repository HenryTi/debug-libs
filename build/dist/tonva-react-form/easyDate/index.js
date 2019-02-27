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
import * as React from 'react';
var EasyDate = /** @class */ (function (_super) {
    __extends(EasyDate, _super);
    function EasyDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EasyDate.prototype.render = function () {
        var date = this.props.date;
        if (!date)
            return null;
        var d = (typeof date === 'string') ? new Date(Date.parse(date)) : date;
        var now = new Date();
        var tick = now.getTime() - d.getTime();
        var nDate = now.getDate();
        var _date = d.getDate(), hour = d.getHours(), minute = d.getMinutes(), month = d.getMonth() + 1;
        var hm = hour + ((minute < 10 ? ':0' : ':') + minute);
        if (tick < -24 * 3600 * 1000)
            return d.getFullYear() + '年' + month + '月' + _date + '日 ' + hm;
        if (tick < 24 * 3600 * 1000) {
            return _date !== nDate ?
                (tick < 0 ? '明天 ' : '昨天 ') + hm
                : hm;
        }
        if (tick < 365 * 24 * 3600 * 1000) {
            return month + '月' + _date + '日 ';
        }
        return d.getFullYear() + '年' + month + '月' + _date + '日';
    };
    return EasyDate;
}(React.Component));
export { EasyDate };
//# sourceMappingURL=index.js.map