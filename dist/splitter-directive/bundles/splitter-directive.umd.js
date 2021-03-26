(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('splitter-directive', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['splitter-directive'] = {}, global.ng.core, global.ng.common));
}(this, (function (exports, i0, common) { 'use strict';

    /** @dynamic */
    var SplitterDirective = /** @class */ (function () {
        function SplitterDirective(el, document) {
            this.el = el;
            this.document = document;
            this.vertical = false;
            this.splits = [];
            this.size = null;
            this.splitclass = null;
            this.addstyle = null;
            this.addhoverstyle = null;
            this.onDropSplitter = new i0.EventEmitter();
        }
        SplitterDirective.prototype.ngOnInit = function () {
            this.parent = this.el.nativeElement;
            var style = "";
            style += this.vertical ?
                "flex-wrap:nowrap;flex-direction:column;display-flex:!important;overflow-y:auto;" + (this.size ? "width: " + this.size + "; max-width:" + this.size + ";" : "")
                : "flex-wrap:nowrap;display-flex:!important;overflow-x:auto;" + (this.size ? "height: " + this.size + "; max-height : " + this.size + ";" : "");
            style += "display:flex;flex-wrap:nowrap;";
            this.parent.style += style;
            console.log(this.getStyle("." + this.splitclass));
            this.init();
        };
        SplitterDirective.prototype.init = function () {
            if (document.readyState == "complete") {
                this.parent.addEventListener("dragover", function (event) { event.preventDefault(); });
                var childrens = this.parent.children.length;
                for (var i = 1; i < childrens; i++) {
                    var islast = i == childrens - 1;
                    var child = this.parent.children[i + this.splits.length];
                    var split = this.getSplitter();
                    this.parent.insertBefore(split, child);
                    this.splits.push(split);
                }
                if (!this.observer) {
                    this.addMutations();
                }
            }
            else {
                this.init();
            }
        };
        SplitterDirective.prototype.getSplitter = function () {
            var _this = this;
            var split = this.document.createElement("split");
            split.classList.add("splitter");
            if (this.splitclass) {
                split.classList.add(this.splitclass);
            }
            var style = "";
            if (this.vertical) {
                split.classList.add("splittervertical");
                style += "border-bottom:solid 4px #DCDCDC;height:0px;max-height:0px;width:100%;display:inline-block;cursor:row-resize;";
            }
            else {
                style += "border-left:solid 4px #DCDCDC;width:0px;max-width:0px;height:100%;display:inline-block;cursor:col-resize;";
            }
            var hoverstyle = "";
            if (this.addhoverstyle) {
                hoverstyle = style + this.addhoverstyle;
            }
            if (this.addstyle) {
                style += this.addstyle;
            }
            split.setAttribute("style", style);
            split.setAttribute("draggable", "true");
            split.draggable = true;
            split.addEventListener("mouseover", function () {
                split.classList.add("splitterhover");
                if (!_this.vertical)
                    split.style.borderLeftColor = "#6196B2";
                else
                    split.style.borderBottomColor = "#6196B2";
                if (hoverstyle) {
                    split.setAttribute("style", hoverstyle);
                }
            });
            split.addEventListener("mouseout", function () {
                split.classList.remove("splitterhover");
                if (!_this.vertical)
                    split.style.borderLeftColor = "#DCDCDC";
                else
                    split.style.borderBottomColor = "#DCDCDC";
                if (hoverstyle) {
                    split.setAttribute("style", style);
                }
            });
            var eventListener = function (event) {
                var dropx = event.pageX;
                var dropy = event.pageY;
                var splitwidth = split.offsetWidth;
                var prev = split.previousElementSibling;
                var next = split.nextElementSibling;
                prev.removeEventListener("drop", eventListener);
                next.removeEventListener("drop", eventListener);
                _this.onDropSplitter.emit({ event: event, split: split, prev: prev, next: next });
                if (!_this.vertical) {
                    var prevwidth = void 0, nextwidth = void 0;
                    if (dropx < split.offsetLeft) {
                        prevwidth = prev.clientWidth - (split.offsetLeft - dropx);
                        nextwidth = next.clientWidth + (split.offsetLeft - dropx);
                    }
                    else {
                        prevwidth = (prev.clientWidth) + (dropx - split.offsetLeft);
                        nextwidth = (next.clientWidth) - (dropx - split.offsetLeft);
                    }
                    prev.style.flex = next.hasAttribute("splitgrow") ? "1 0 " + prevwidth + "px" : "0 1 " + prevwidth + "px";
                    next.style.flex = next.hasAttribute("splitgrow") ? "1 0 " + nextwidth + "px" : "0 1 " + nextwidth + "px";
                    prev.style.overflowX = "auto";
                    next.style.overflowX = "auto";
                }
                else {
                    var prevheight = void 0, nextheight = void 0;
                    if (dropy < split.offsetTop) {
                        prevheight = prev.clientHeight - (split.offsetTop - dropy);
                        nextheight = next.clientHeight + (split.offsetTop - dropy);
                    }
                    else {
                        prevheight = prev.clientHeight + (dropy - split.offsetTop);
                        nextheight = next.clientHeight - (dropy - split.offsetTop);
                    }
                    prev.style.flex = next.hasAttribute("splitgrow") ? "1 0 " + prevheight + "px" : "0 1 " + prevheight + "px";
                    next.style.flex = next.hasAttribute("splitgrow") ? "1 0 " + nextheight + "px" : "0 1 " + nextheight + "px";
                    prev.style.overflowY = "auto";
                    next.style.overflowY = "auto";
                }
            };
            split.addEventListener("dragstart", function (event) {
                var prev = split.previousElementSibling;
                var next = split.nextElementSibling;
                prev.addEventListener("drop", eventListener);
                next.addEventListener("drop", eventListener);
            });
            return split;
        };
        SplitterDirective.prototype.getPercentage = function (pixel) {
            var width = this.parent.offsetWidth;
            return pixel / width * 100;
        };
        SplitterDirective.prototype.getPercentageHeight = function (pixel) {
            var height = this.parent.offsetHeight;
            return pixel / height * 100;
        };
        SplitterDirective.prototype.addMutations = function () {
            var _this = this;
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    _this.reset();
                    _this.init();
                });
            });
            var config = { childList: true };
            observer.observe(this.parent, config);
            this.observer = observer;
        };
        SplitterDirective.prototype.reset = function () {
            var _this = this;
            this.observer.disconnect();
            this.splits.forEach(function (item) {
                _this.parent.removeChild(item);
            });
            this.splits = [];
            this.observer = null;
        };
        SplitterDirective.prototype.getStyle = function (className) {
            var cssText = "";
            var classes = this.document.styleSheets[0].rules || this.document.styleSheets[0].cssRules;
            for (var x = 0; x < classes.length; x++) {
                if (classes[x].selectorText == className) {
                    cssText += classes[x].cssText || classes[x].style.cssText;
                }
            }
            return cssText;
        };
        return SplitterDirective;
    }());
    SplitterDirective.ɵfac = function SplitterDirective_Factory(t) { return new (t || SplitterDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(common.DOCUMENT)); };
    SplitterDirective.ɵdir = i0.ɵɵdefineDirective({ type: SplitterDirective, selectors: [["", "splitterDirective", ""]], inputs: { vertical: "vertical", size: "size", splitclass: "splitclass", addstyle: "addstyle", addhoverstyle: "addhoverstyle" }, outputs: { onDropSplitter: "onDropSplitter" } });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SplitterDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[splitterDirective]'
                    }]
            }], function () {
            return [{ type: i0.ElementRef }, { type: Document, decorators: [{
                            type: i0.Inject,
                            args: [common.DOCUMENT]
                        }] }];
        }, { vertical: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], splitclass: [{
                    type: i0.Input
                }], addstyle: [{
                    type: i0.Input
                }], addhoverstyle: [{
                    type: i0.Input
                }], onDropSplitter: [{
                    type: i0.Output
                }] });
    })();

    var TestComponentComponent = /** @class */ (function () {
        function TestComponentComponent() {
        }
        TestComponentComponent.prototype.ngOnInit = function () {
        };
        return TestComponentComponent;
    }());
    TestComponentComponent.ɵfac = function TestComponentComponent_Factory(t) { return new (t || TestComponentComponent)(); };
    TestComponentComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TestComponentComponent, selectors: [["lib-test-component"]], decls: 89, vars: 8, consts: [[1, "boxcomment"], [1, "code"], [1, "comment"], ["splitterDirective", "", 1, "mainbox"], [1, "boxmenu"], [1, "box"], ["splitterDirective", "", 3, "addstyle", "addhoverstyle", "size"], [1, "box4"], ["splitterDirective", "", 1, "mainboxV", 3, "vertical", "size"], [1, "boxvmenu"], [1, "boxv"]], template: function TestComponentComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "h1");
                i0.ɵɵtext(1, "EXAMPLES USING SPLITTER");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(2, "div", 0);
                i0.ɵɵelementStart(3, "div", 1);
                i0.ɵɵelementStart(4, "pre");
                i0.ɵɵelementStart(5, "code");
                i0.ɵɵtext(6);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(7, "div", 2);
                i0.ɵɵelementStart(8, "p");
                i0.ɵɵtext(9, "In this example we can see a basic use in horizontal mode.");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(10, "p");
                i0.ɵɵtext(11, "With class ");
                i0.ɵɵelementStart(12, "code");
                i0.ɵɵtext(13, ".mainbox");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(14, " we stablished the main size of the container of divs what we must have to define for a good function of the splitterDirective");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(15, "p");
                i0.ɵɵtext(16, "With class ");
                i0.ɵɵelementStart(17, "code");
                i0.ɵɵtext(18, ".box");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(19, " and ");
                i0.ɵɵelementStart(20, "code");
                i0.ɵɵtext(21, ".boxmenu");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(22, " we stablished the initial width of the each div. ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(23, "div", 3);
                i0.ɵɵelement(24, "div", 4);
                i0.ɵɵelement(25, "div", 5);
                i0.ɵɵelement(26, "div", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelement(27, "br");
                i0.ɵɵelement(28, "br");
                i0.ɵɵelementStart(29, "div", 0);
                i0.ɵɵelementStart(30, "div", 1);
                i0.ɵɵelementStart(31, "pre");
                i0.ɵɵelementStart(32, "code");
                i0.ɵɵtext(33);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(34, "div", 2);
                i0.ɵɵelementStart(35, "p");
                i0.ɵɵtext(36, " In this example we use propery ");
                i0.ɵɵelementStart(37, "code");
                i0.ɵɵtext(38, "size");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(39, " to limit the height on horizontal splitter mode. ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(40, "p");
                i0.ɵɵtext(41, " The property ");
                i0.ɵɵelementStart(42, "code");
                i0.ɵɵtext(43, "addstyle");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(44, " and ");
                i0.ɵɵelementStart(45, "code");
                i0.ɵɵtext(46, "addhoverstyle");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(47, " we add custom styles for the splits. This way we can customize our splits or splits ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(48, "p");
                i0.ɵɵtext(49, " With class ");
                i0.ɵɵelementStart(50, "code");
                i0.ɵɵtext(51, ".box4");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(52, " We define the initial width of each div ");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(53, "div", 6);
                i0.ɵɵelement(54, "div", 7);
                i0.ɵɵelement(55, "div", 7);
                i0.ɵɵelement(56, "div", 7);
                i0.ɵɵelement(57, "div", 7);
                i0.ɵɵelementEnd();
                i0.ɵɵelement(58, "br");
                i0.ɵɵelement(59, "br");
                i0.ɵɵelementStart(60, "div", 0);
                i0.ɵɵelementStart(61, "div", 1);
                i0.ɵɵelementStart(62, "pre");
                i0.ɵɵelementStart(63, "code");
                i0.ɵɵtext(64);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(65, "div", 2);
                i0.ɵɵelementStart(66, "p");
                i0.ɵɵtext(67, "In this example we split in vertical mode setting a size of ");
                i0.ɵɵelementStart(68, "code");
                i0.ɵɵtext(69, "600px");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(70, " that in vertical case is the width.");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(71, "p");
                i0.ɵɵtext(72, "Class ");
                i0.ɵɵelementStart(73, "code");
                i0.ɵɵtext(74, ".mainboxV");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(75, " set the style of the main container");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(76, "p");
                i0.ɵɵtext(77, "Class ");
                i0.ɵɵelementStart(78, "code");
                i0.ɵɵtext(79, ".boxvmenu");
                i0.ɵɵelementEnd();
                i0.ɵɵtext(80, " and boxv we set the initial height and style of the splits");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(81, "div", 8);
                i0.ɵɵelement(82, "div", 9);
                i0.ɵɵelement(83, "div", 10);
                i0.ɵɵelement(84, "div", 9);
                i0.ɵɵelementEnd();
                i0.ɵɵelement(85, "br");
                i0.ɵɵelement(86, "br");
                i0.ɵɵelementStart(87, "pre");
                i0.ɵɵelement(88, "code");
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(6);
                i0.ɵɵtextInterpolate1("\n    <style>\n      ", ".mainbox{\n            width:500px;\n            height:200px;\n        }\n        .boxmenu{\n            width:20%;\n            border:solid black 1px;\n\n        }\n        .box {\n            width:60%;\n            border:solid black 1px;\n        }", "\n    </style>\n    <div splitterDirective class=\"mainbox\" >\n        <div class=\"boxmenu\"></div>\n        <div class=\"box\"></div>\n        <div class=\"boxmenu\"></div>\n    </div>\n");
                i0.ɵɵadvance(27);
                i0.ɵɵtextInterpolate1("\n        <style>\n           ", " .box4 {\n                width:25%;\n                border:solid black 1px;\n            }\n            ", "\n        </style>\n        <div splitterDirective [addstyle]=\"'border-left-color:black;border-left-width:10px'\" \n        [addhoverstyle]=\"'border-left-color:yellow;border-left-width:10px'\" [size]=\"'200px'\" >\n            <div class=\"box4\"></div>\n            <div class=\"box4\"></div>\n            <div class=\"box4\"></div>\n            <div class=\"box4\"></div>\n        </div>\n    ");
                i0.ɵɵadvance(20);
                i0.ɵɵproperty("addstyle", "border-left-color:black;border-left-width:10px")("addhoverstyle", "border-left-color:yellow;border-left-width:10px")("size", "200px");
                i0.ɵɵadvance(11);
                i0.ɵɵtextInterpolate1("\n        <style>\n           ", ".mainboxV{\n                height:400px;\n            }\n            .boxv {\n                height:33%;\n                border:solid black 1px;\n            }\n            .boxvmenu{\n                height: 100px;\n                border:solid black 1px;\n            \n            }\n            ", "\n        </style>\n        <div splitterDirective [vertical]=\"true\" class=\"mainboxV\"  [size]=\"'400px'\">\n            <div class=\"boxv\"></div>\n            <div class=\"boxv\"></div>\n            <div class=\"boxv\"></div>\n        </div>\n\n    ");
                i0.ɵɵadvance(17);
                i0.ɵɵproperty("vertical", true)("size", "600px");
            }
        }, directives: [SplitterDirective], styles: [".boxcomment[_ngcontent-%COMP%]{display:flex;flex-direction:row}.comment[_ngcontent-%COMP%]{flex:1;overflow:auto}.code[_ngcontent-%COMP%]{flex:0 auto;padding:0 40px;overflow:auto}.mainbox[_ngcontent-%COMP%]{width:500px;height:300px}.boxmenu[_ngcontent-%COMP%]{width:20%}.box[_ngcontent-%COMP%], .boxmenu[_ngcontent-%COMP%]{border:1px solid #000}.box[_ngcontent-%COMP%]{width:60%}.box4[_ngcontent-%COMP%]{width:25%}.box4[_ngcontent-%COMP%], .boxv[_ngcontent-%COMP%]{border:1px solid #000}.boxv[_ngcontent-%COMP%]{flex:1 0 auto}.boxvmenu[_ngcontent-%COMP%]{height:100px;border:1px solid #000}.boxb[_ngcontent-%COMP%]{background-color:#00f}.boxr[_ngcontent-%COMP%]{background-color:red}.boxg[_ngcontent-%COMP%]{background-color:green}.mainboxV[_ngcontent-%COMP%]{height:400px}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestComponentComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-test-component',
                        templateUrl: './test-component.component.html',
                        styleUrls: ['./test-component.component.css']
                    }]
            }], function () { return []; }, null);
    })();

    var SplitterDirectiveModule = /** @class */ (function () {
        function SplitterDirectiveModule() {
        }
        return SplitterDirectiveModule;
    }());
    SplitterDirectiveModule.ɵfac = function SplitterDirectiveModule_Factory(t) { return new (t || SplitterDirectiveModule)(); };
    SplitterDirectiveModule.ɵmod = i0.ɵɵdefineNgModule({ type: SplitterDirectiveModule });
    SplitterDirectiveModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SplitterDirectiveModule, { declarations: [SplitterDirective, TestComponentComponent], exports: [SplitterDirective] }); })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SplitterDirectiveModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [SplitterDirective, TestComponentComponent],
                        imports: [],
                        exports: [SplitterDirective]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of splitter-directive
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SplitterDirective = SplitterDirective;
    exports.SplitterDirectiveModule = SplitterDirectiveModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=splitter-directive.umd.js.map
