var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
const defaultImage = 'http://101.200.46.56/imgs/Bear-icon.png';
let Image = class Image extends React.Component {
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let { src } = this.props;
            if (src === undefined) {
                this.src = defaultImage;
                return;
            }
            if (src.startsWith(':') === false) {
                this.src = src;
                return;
            }
            this.src = defaultImage;
        });
    }
    render() {
        let { src, className, style } = this.props;
        if (src === undefined)
            return React.createElement("img", { src: this.src, className: className, style: style });
    }
};
__decorate([
    observable
], Image.prototype, "src", void 0);
Image = __decorate([
    observer
], Image);
export { Image };
//# sourceMappingURL=image.js.map