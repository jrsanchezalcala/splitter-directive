import { EventEmitter, Directive, ElementRef, Inject, Input, Output, Component, NgModule } from '@angular/core';
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
SplitterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[splitterDirective]'
            },] }
];
SplitterDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
SplitterDirective.propDecorators = {
    vertical: [{ type: Input }],
    size: [{ type: Input }],
    splitclass: [{ type: Input }],
    addstyle: [{ type: Input }],
    addhoverstyle: [{ type: Input }],
    onDropSplitter: [{ type: Output }]
};

class TestComponentComponent {
    constructor() { }
    ngOnInit() {
    }
}
TestComponentComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-test-component',
                template: "<h1>EXAMPLES USING SPLITTER</h1>\n<div class=\"boxcomment\">\n<div class=\"code\">\n<pre><code>\n    &lt;style&gt;\n      {{\".mainbox{\n            width:500px;\n            height:200px;\n        }\n        .boxmenu{\n            width:20%;\n            border:solid black 1px;\n\n        }\n        .box {\n            width:60%;\n            border:solid black 1px;\n        }\"}}\n    &lt;/style&gt;\n    &lt;div splitterDirective class=&quot;mainbox&quot; &gt;\n        &lt;div class=&quot;boxmenu&quot;&gt;&lt;/div&gt;\n        &lt;div class=&quot;box&quot;&gt;&lt;/div&gt;\n        &lt;div class=&quot;boxmenu&quot;&gt;&lt;/div&gt;\n    &lt;/div&gt;\n</code></pre>\n</div>\n<div class=\"comment\">\n    <p>In this example we can see a basic use in horizontal mode.</p>\n    <p>With class <code>.mainbox</code> we stablished the main size of the container of divs what we must have to define for a good function of the splitterDirective</p>\n    <p>With class <code>.box</code> and <code>.boxmenu</code> we stablished the initial width of the each div. </p>\n</div>\n</div>\n    <div splitterDirective class=\"mainbox\" >\n        <div class=\"boxmenu\"></div>\n        <div class=\"box\"></div>\n        <div class=\"boxmenu\"></div>\n    </div>\n    <br>\n    <br>\n<div class=\"boxcomment\">\n    <div class=\"code\">\n    <pre><code>\n        &lt;style&gt;\n           {{\" .box4 {\n                width:25%;\n                border:solid black 1px;\n            }\n            \"}}\n        &lt;/style&gt;\n        &lt;div splitterDirective [addstyle]=&quot;'border-left-color:black;border-left-width:10px'&quot; \n        [addhoverstyle]=&quot;'border-left-color:yellow;border-left-width:10px'&quot; [size]=&quot;'200px'&quot; &gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n        &lt;/div&gt;\n    </code></pre>\n</div>\n<div class=\"comment\">   \n    <p>\n        In this example we use propery <code>size</code> to limit the height on horizontal splitter mode. \n    </p>\n    <p>\n        The property <code>addstyle</code> and <code>addhoverstyle</code> we add custom styles for the splits. This way we can customize our splits or splits\n    </p>\n    <p>\n        With class <code>.box4</code> We define the initial width of each div\n    </p>\n\n</div>\n</div>\n    <div splitterDirective [addstyle]=\"'border-left-color:black;border-left-width:10px'\" [addhoverstyle]=\"'border-left-color:yellow;border-left-width:10px'\" [size]=\"'200px'\" >\n        <div class=\"box4\"></div>\n        <div class=\"box4\"></div>\n        <div class=\"box4\"></div>\n        <div class=\"box4\"></div>\n    </div>\n    <br>\n    <br>\n    <div class=\"boxcomment\">\n    <div class=\"code\">\n    <pre><code>\n        &lt;style&gt;\n           {{\".mainboxV{\n                height:400px;\n            }\n            .boxv {\n                height:33%;\n                border:solid black 1px;\n            }\n            .boxvmenu{\n                height: 100px;\n                border:solid black 1px;\n            \n            }\n            \"}}\n        &lt;/style&gt;\n        &lt;div splitterDirective [vertical]=&quot;true&quot; class=&quot;mainboxV&quot;  [size]=&quot;'400px'&quot;&gt;\n            &lt;div class=&quot;boxv&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;boxv&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;boxv&quot;&gt;&lt;/div&gt;\n        &lt;/div&gt;\n\n    </code></pre>\n    </div>\n    <div class=\"comment\">\n        <p>In this example we split in vertical mode setting a size of <code>600px</code> that in vertical case is the width.</p>\n        <p>Class <code>.mainboxV</code> set the style of the main container</p>\n        <p>Class <code>.boxvmenu</code> and boxv we set the initial height and style of the splits</p>\n    </div>\n</div>  \n    <div splitterDirective [vertical]=\"true\" class=\"mainboxV\"  [size]=\"'600px'\">\n        <div class=\"boxvmenu \"></div>\n        <div class=\"boxv\"></div>\n        <div class=\"boxvmenu\"></div>\n    </div>\n    <br>\n    <br>\n    <pre><code></code></pre>\n    \n\n",
                styles: [".boxcomment{display:flex;flex-direction:row}.comment{flex:1;overflow:auto}.code{flex:0 auto;padding:0 40px;overflow:auto}.mainbox{width:500px;height:300px}.boxmenu{width:20%}.box,.boxmenu{border:1px solid #000}.box{width:60%}.box4{width:25%}.box4,.boxv{border:1px solid #000}.boxv{flex:1 0 auto}.boxvmenu{height:100px;border:1px solid #000}.boxb{background-color:#00f}.boxr{background-color:red}.boxg{background-color:green}.mainboxV{height:400px}"]
            },] }
];
TestComponentComponent.ctorParameters = () => [];

class SplitterDirectiveModule {
}
SplitterDirectiveModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SplitterDirective, TestComponentComponent],
                imports: [],
                exports: [SplitterDirective]
            },] }
];

/*
 * Public API Surface of splitter-directive
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SplitterDirective, SplitterDirectiveModule, TestComponentComponent as ɵa };
//# sourceMappingURL=splitter-directive.js.map
