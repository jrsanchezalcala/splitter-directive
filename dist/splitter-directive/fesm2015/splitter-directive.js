import { EventEmitter, ɵɵdirectiveInject, ElementRef, ɵɵdefineDirective, ɵsetClassMetadata, Directive, Inject, Input, Output, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵɵelement, ɵɵadvance, ɵɵtextInterpolate1, ɵɵproperty, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** @dynamic */
class SplitterDirective {
    constructor(el, document) {
        this.el = el;
        this.document = document;
        this.vertical = false;
        this.splits = [];
        this.size = null;
        this.splitclass = null;
        this.addstyle = null;
        this.addhoverstyle = null;
        this.onDropSplitter = new EventEmitter();
    }
    ngOnInit() {
        this.parent = this.el.nativeElement;
        let style = "";
        style += this.vertical ?
            `flex-wrap:nowrap;flex-direction:column;display-flex:!important;overflow-y:auto;${this.size ? `width: ${this.size}; max-width:${this.size};` : ``}`
            : `flex-wrap:nowrap;display-flex:!important;overflow-x:auto;${this.size ? `height: ${this.size}; max-height : ${this.size};` : ``}`;
        style += "display:flex;flex-wrap:nowrap;";
        this.parent.style += style;
        console.log(this.getStyle("." + this.splitclass));
        this.init();
    }
    init() {
        if (document.readyState == "complete") {
            this.parent.addEventListener("dragover", (event) => { event.preventDefault(); });
            let childrens = this.parent.children.length;
            for (let i = 1; i < childrens; i++) {
                let islast = i == childrens - 1;
                let child = this.parent.children[i + this.splits.length];
                let split = this.getSplitter();
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
    }
    getSplitter() {
        let split = this.document.createElement("split");
        split.classList.add("splitter");
        if (this.splitclass) {
            split.classList.add(this.splitclass);
        }
        let style = "";
        if (this.vertical) {
            split.classList.add("splittervertical");
            style += `border-bottom:solid 4px #DCDCDC;height:0px;max-height:0px;width:100%;display:inline-block;cursor:row-resize;`;
        }
        else {
            style += `border-left:solid 4px #DCDCDC;width:0px;max-width:0px;height:100%;display:inline-block;cursor:col-resize;`;
        }
        let hoverstyle = "";
        if (this.addhoverstyle) {
            hoverstyle = style + this.addhoverstyle;
        }
        if (this.addstyle) {
            style += this.addstyle;
        }
        split.setAttribute("style", style);
        split.setAttribute("draggable", "true");
        split.draggable = true;
        split.addEventListener("mouseover", () => {
            split.classList.add("splitterhover");
            if (!this.vertical)
                split.style.borderLeftColor = "#6196B2";
            else
                split.style.borderBottomColor = "#6196B2";
            if (hoverstyle) {
                split.setAttribute("style", hoverstyle);
            }
        });
        split.addEventListener("mouseout", () => {
            split.classList.remove("splitterhover");
            if (!this.vertical)
                split.style.borderLeftColor = "#DCDCDC";
            else
                split.style.borderBottomColor = "#DCDCDC";
            if (hoverstyle) {
                split.setAttribute("style", style);
            }
        });
        let eventListener = (event) => {
            let dropx = event.pageX;
            let dropy = event.pageY;
            let splitwidth = split.offsetWidth;
            let prev = split.previousElementSibling;
            let next = split.nextElementSibling;
            prev.removeEventListener("drop", eventListener);
            next.removeEventListener("drop", eventListener);
            this.onDropSplitter.emit({ event, split, prev, next });
            if (!this.vertical) {
                let prevwidth, nextwidth;
                if (dropx < split.offsetLeft) {
                    prevwidth = prev.clientWidth - (split.offsetLeft - dropx);
                    nextwidth = next.clientWidth + (split.offsetLeft - dropx);
                }
                else {
                    prevwidth = (prev.clientWidth) + (dropx - split.offsetLeft);
                    nextwidth = (next.clientWidth) - (dropx - split.offsetLeft);
                }
                prev.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${prevwidth}px` : `0 1 ${prevwidth}px`;
                next.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${nextwidth}px` : `0 1 ${nextwidth}px`;
                prev.style.overflowX = "auto";
                next.style.overflowX = "auto";
            }
            else {
                let prevheight, nextheight;
                if (dropy < split.offsetTop) {
                    prevheight = prev.clientHeight - (split.offsetTop - dropy);
                    nextheight = next.clientHeight + (split.offsetTop - dropy);
                }
                else {
                    prevheight = prev.clientHeight + (dropy - split.offsetTop);
                    nextheight = next.clientHeight - (dropy - split.offsetTop);
                }
                prev.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${prevheight}px` : `0 1 ${prevheight}px`;
                next.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${nextheight}px` : `0 1 ${nextheight}px`;
                prev.style.overflowY = "auto";
                next.style.overflowY = "auto";
            }
        };
        split.addEventListener("dragstart", (event) => {
            let prev = split.previousElementSibling;
            let next = split.nextElementSibling;
            prev.addEventListener("drop", eventListener);
            next.addEventListener("drop", eventListener);
        });
        return split;
    }
    getPercentage(pixel) {
        let width = this.parent.offsetWidth;
        return pixel / width * 100;
    }
    getPercentageHeight(pixel) {
        let height = this.parent.offsetHeight;
        return pixel / height * 100;
    }
    addMutations() {
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                this.reset();
                this.init();
            });
        });
        let config = { childList: true };
        observer.observe(this.parent, config);
        this.observer = observer;
    }
    reset() {
        this.observer.disconnect();
        this.splits.forEach((item) => {
            this.parent.removeChild(item);
        });
        this.splits = [];
        this.observer = null;
    }
    getStyle(className) {
        var cssText = "";
        var classes = this.document.styleSheets[0].rules || this.document.styleSheets[0].cssRules;
        for (var x = 0; x < classes.length; x++) {
            if (classes[x].selectorText == className) {
                cssText += classes[x].cssText || classes[x].style.cssText;
            }
        }
        return cssText;
    }
}
SplitterDirective.ɵfac = function SplitterDirective_Factory(t) { return new (t || SplitterDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT)); };
SplitterDirective.ɵdir = ɵɵdefineDirective({ type: SplitterDirective, selectors: [["", "splitterDirective", ""]], inputs: { vertical: "vertical", size: "size", splitclass: "splitclass", addstyle: "addstyle", addhoverstyle: "addhoverstyle" }, outputs: { onDropSplitter: "onDropSplitter" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(SplitterDirective, [{
        type: Directive,
        args: [{
                selector: '[splitterDirective]'
            }]
    }], function () { return [{ type: ElementRef }, { type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, { vertical: [{
            type: Input
        }], size: [{
            type: Input
        }], splitclass: [{
            type: Input
        }], addstyle: [{
            type: Input
        }], addhoverstyle: [{
            type: Input
        }], onDropSplitter: [{
            type: Output
        }] }); })();

class TestComponentComponent {
    constructor() { }
    ngOnInit() {
    }
}
TestComponentComponent.ɵfac = function TestComponentComponent_Factory(t) { return new (t || TestComponentComponent)(); };
TestComponentComponent.ɵcmp = ɵɵdefineComponent({ type: TestComponentComponent, selectors: [["lib-test-component"]], decls: 89, vars: 8, consts: [[1, "boxcomment"], [1, "code"], [1, "comment"], ["splitterDirective", "", 1, "mainbox"], [1, "boxmenu"], [1, "box"], ["splitterDirective", "", 3, "addstyle", "addhoverstyle", "size"], [1, "box4"], ["splitterDirective", "", 1, "mainboxV", 3, "vertical", "size"], [1, "boxvmenu"], [1, "boxv"]], template: function TestComponentComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "h1");
        ɵɵtext(1, "EXAMPLES USING SPLITTER");
        ɵɵelementEnd();
        ɵɵelementStart(2, "div", 0);
        ɵɵelementStart(3, "div", 1);
        ɵɵelementStart(4, "pre");
        ɵɵelementStart(5, "code");
        ɵɵtext(6);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(7, "div", 2);
        ɵɵelementStart(8, "p");
        ɵɵtext(9, "In this example we can see a basic use in horizontal mode.");
        ɵɵelementEnd();
        ɵɵelementStart(10, "p");
        ɵɵtext(11, "With class ");
        ɵɵelementStart(12, "code");
        ɵɵtext(13, ".mainbox");
        ɵɵelementEnd();
        ɵɵtext(14, " we stablished the main size of the container of divs what we must have to define for a good function of the splitterDirective");
        ɵɵelementEnd();
        ɵɵelementStart(15, "p");
        ɵɵtext(16, "With class ");
        ɵɵelementStart(17, "code");
        ɵɵtext(18, ".box");
        ɵɵelementEnd();
        ɵɵtext(19, " and ");
        ɵɵelementStart(20, "code");
        ɵɵtext(21, ".boxmenu");
        ɵɵelementEnd();
        ɵɵtext(22, " we stablished the initial width of the each div. ");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(23, "div", 3);
        ɵɵelement(24, "div", 4);
        ɵɵelement(25, "div", 5);
        ɵɵelement(26, "div", 4);
        ɵɵelementEnd();
        ɵɵelement(27, "br");
        ɵɵelement(28, "br");
        ɵɵelementStart(29, "div", 0);
        ɵɵelementStart(30, "div", 1);
        ɵɵelementStart(31, "pre");
        ɵɵelementStart(32, "code");
        ɵɵtext(33);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(34, "div", 2);
        ɵɵelementStart(35, "p");
        ɵɵtext(36, " In this example we use propery ");
        ɵɵelementStart(37, "code");
        ɵɵtext(38, "size");
        ɵɵelementEnd();
        ɵɵtext(39, " to limit the height on horizontal splitter mode. ");
        ɵɵelementEnd();
        ɵɵelementStart(40, "p");
        ɵɵtext(41, " The property ");
        ɵɵelementStart(42, "code");
        ɵɵtext(43, "addstyle");
        ɵɵelementEnd();
        ɵɵtext(44, " and ");
        ɵɵelementStart(45, "code");
        ɵɵtext(46, "addhoverstyle");
        ɵɵelementEnd();
        ɵɵtext(47, " we add custom styles for the splits. This way we can customize our splits or splits ");
        ɵɵelementEnd();
        ɵɵelementStart(48, "p");
        ɵɵtext(49, " With class ");
        ɵɵelementStart(50, "code");
        ɵɵtext(51, ".box4");
        ɵɵelementEnd();
        ɵɵtext(52, " We define the initial width of each div ");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(53, "div", 6);
        ɵɵelement(54, "div", 7);
        ɵɵelement(55, "div", 7);
        ɵɵelement(56, "div", 7);
        ɵɵelement(57, "div", 7);
        ɵɵelementEnd();
        ɵɵelement(58, "br");
        ɵɵelement(59, "br");
        ɵɵelementStart(60, "div", 0);
        ɵɵelementStart(61, "div", 1);
        ɵɵelementStart(62, "pre");
        ɵɵelementStart(63, "code");
        ɵɵtext(64);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(65, "div", 2);
        ɵɵelementStart(66, "p");
        ɵɵtext(67, "In this example we split in vertical mode setting a size of ");
        ɵɵelementStart(68, "code");
        ɵɵtext(69, "600px");
        ɵɵelementEnd();
        ɵɵtext(70, " that in vertical case is the width.");
        ɵɵelementEnd();
        ɵɵelementStart(71, "p");
        ɵɵtext(72, "Class ");
        ɵɵelementStart(73, "code");
        ɵɵtext(74, ".mainboxV");
        ɵɵelementEnd();
        ɵɵtext(75, " set the style of the main container");
        ɵɵelementEnd();
        ɵɵelementStart(76, "p");
        ɵɵtext(77, "Class ");
        ɵɵelementStart(78, "code");
        ɵɵtext(79, ".boxvmenu");
        ɵɵelementEnd();
        ɵɵtext(80, " and boxv we set the initial height and style of the splits");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(81, "div", 8);
        ɵɵelement(82, "div", 9);
        ɵɵelement(83, "div", 10);
        ɵɵelement(84, "div", 9);
        ɵɵelementEnd();
        ɵɵelement(85, "br");
        ɵɵelement(86, "br");
        ɵɵelementStart(87, "pre");
        ɵɵelement(88, "code");
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(6);
        ɵɵtextInterpolate1("\n    <style>\n      ", ".mainbox{\n            width:500px;\n            height:200px;\n        }\n        .boxmenu{\n            width:20%;\n            border:solid black 1px;\n\n        }\n        .box {\n            width:60%;\n            border:solid black 1px;\n        }", "\n    </style>\n    <div splitterDirective class=\"mainbox\" >\n        <div class=\"boxmenu\"></div>\n        <div class=\"box\"></div>\n        <div class=\"boxmenu\"></div>\n    </div>\n");
        ɵɵadvance(27);
        ɵɵtextInterpolate1("\n        <style>\n           ", " .box4 {\n                width:25%;\n                border:solid black 1px;\n            }\n            ", "\n        </style>\n        <div splitterDirective [addstyle]=\"'border-left-color:black;border-left-width:10px'\" \n        [addhoverstyle]=\"'border-left-color:yellow;border-left-width:10px'\" [size]=\"'200px'\" >\n            <div class=\"box4\"></div>\n            <div class=\"box4\"></div>\n            <div class=\"box4\"></div>\n            <div class=\"box4\"></div>\n        </div>\n    ");
        ɵɵadvance(20);
        ɵɵproperty("addstyle", "border-left-color:black;border-left-width:10px")("addhoverstyle", "border-left-color:yellow;border-left-width:10px")("size", "200px");
        ɵɵadvance(11);
        ɵɵtextInterpolate1("\n        <style>\n           ", ".mainboxV{\n                height:400px;\n            }\n            .boxv {\n                height:33%;\n                border:solid black 1px;\n            }\n            .boxvmenu{\n                height: 100px;\n                border:solid black 1px;\n            \n            }\n            ", "\n        </style>\n        <div splitterDirective [vertical]=\"true\" class=\"mainboxV\"  [size]=\"'400px'\">\n            <div class=\"boxv\"></div>\n            <div class=\"boxv\"></div>\n            <div class=\"boxv\"></div>\n        </div>\n\n    ");
        ɵɵadvance(17);
        ɵɵproperty("vertical", true)("size", "600px");
    } }, directives: [SplitterDirective], styles: [".boxcomment[_ngcontent-%COMP%]{display:flex;flex-direction:row}.comment[_ngcontent-%COMP%]{flex:1;overflow:auto}.code[_ngcontent-%COMP%]{flex:0 auto;padding:0 40px;overflow:auto}.mainbox[_ngcontent-%COMP%]{width:500px;height:300px}.boxmenu[_ngcontent-%COMP%]{width:20%}.box[_ngcontent-%COMP%], .boxmenu[_ngcontent-%COMP%]{border:1px solid #000}.box[_ngcontent-%COMP%]{width:60%}.box4[_ngcontent-%COMP%]{width:25%}.box4[_ngcontent-%COMP%], .boxv[_ngcontent-%COMP%]{border:1px solid #000}.boxv[_ngcontent-%COMP%]{flex:1 0 auto}.boxvmenu[_ngcontent-%COMP%]{height:100px;border:1px solid #000}.boxb[_ngcontent-%COMP%]{background-color:#00f}.boxr[_ngcontent-%COMP%]{background-color:red}.boxg[_ngcontent-%COMP%]{background-color:green}.mainboxV[_ngcontent-%COMP%]{height:400px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(TestComponentComponent, [{
        type: Component,
        args: [{
                selector: 'lib-test-component',
                templateUrl: './test-component.component.html',
                styleUrls: ['./test-component.component.css']
            }]
    }], function () { return []; }, null); })();

class SplitterDirectiveModule {
}
SplitterDirectiveModule.ɵfac = function SplitterDirectiveModule_Factory(t) { return new (t || SplitterDirectiveModule)(); };
SplitterDirectiveModule.ɵmod = ɵɵdefineNgModule({ type: SplitterDirectiveModule });
SplitterDirectiveModule.ɵinj = ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(SplitterDirectiveModule, { declarations: [SplitterDirective, TestComponentComponent], exports: [SplitterDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(SplitterDirectiveModule, [{
        type: NgModule,
        args: [{
                declarations: [SplitterDirective, TestComponentComponent],
                imports: [],
                exports: [SplitterDirective]
            }]
    }], null, null); })();

/*
 * Public API Surface of splitter-directive
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SplitterDirective, SplitterDirectiveModule };
//# sourceMappingURL=splitter-directive.js.map
