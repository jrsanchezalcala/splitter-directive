(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('splitter-directive', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['splitter-directive'] = {}, global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

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
            this.onDropSplitter = new core.EventEmitter();
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
    SplitterDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[splitterDirective]'
                },] }
    ];
    SplitterDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: Document, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    SplitterDirective.propDecorators = {
        vertical: [{ type: core.Input }],
        size: [{ type: core.Input }],
        splitclass: [{ type: core.Input }],
        addstyle: [{ type: core.Input }],
        addhoverstyle: [{ type: core.Input }],
        onDropSplitter: [{ type: core.Output }]
    };

    var TestComponentComponent = /** @class */ (function () {
        function TestComponentComponent() {
        }
        TestComponentComponent.prototype.ngOnInit = function () {
        };
        return TestComponentComponent;
    }());
    TestComponentComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'lib-test-component',
                    template: "<h1>EXAMPLES USING SPLITTER</h1>\n<div class=\"boxcomment\">\n<div class=\"code\">\n<pre><code>\n    &lt;style&gt;\n      {{\".mainbox{\n            width:500px;\n            height:200px;\n        }\n        .boxmenu{\n            width:20%;\n            border:solid black 1px;\n\n        }\n        .box {\n            width:60%;\n            border:solid black 1px;\n        }\"}}\n    &lt;/style&gt;\n    &lt;div splitterDirective class=&quot;mainbox&quot; &gt;\n        &lt;div class=&quot;boxmenu&quot;&gt;&lt;/div&gt;\n        &lt;div class=&quot;box&quot;&gt;&lt;/div&gt;\n        &lt;div class=&quot;boxmenu&quot;&gt;&lt;/div&gt;\n    &lt;/div&gt;\n</code></pre>\n</div>\n<div class=\"comment\">\n    <p>In this example we can see a basic use in horizontal mode.</p>\n    <p>With class <code>.mainbox</code> we stablished the main size of the container of divs what we must have to define for a good function of the splitterDirective</p>\n    <p>With class <code>.box</code> and <code>.boxmenu</code> we stablished the initial width of the each div. </p>\n</div>\n</div>\n    <div splitterDirective class=\"mainbox\" >\n        <div class=\"boxmenu\"></div>\n        <div class=\"box\"></div>\n        <div class=\"boxmenu\"></div>\n    </div>\n    <br>\n    <br>\n<div class=\"boxcomment\">\n    <div class=\"code\">\n    <pre><code>\n        &lt;style&gt;\n           {{\" .box4 {\n                width:25%;\n                border:solid black 1px;\n            }\n            \"}}\n        &lt;/style&gt;\n        &lt;div splitterDirective [addstyle]=&quot;'border-left-color:black;border-left-width:10px'&quot; \n        [addhoverstyle]=&quot;'border-left-color:yellow;border-left-width:10px'&quot; [size]=&quot;'200px'&quot; &gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;box4&quot;&gt;&lt;/div&gt;\n        &lt;/div&gt;\n    </code></pre>\n</div>\n<div class=\"comment\">   \n    <p>\n        In this example we use propery <code>size</code> to limit the height on horizontal splitter mode. \n    </p>\n    <p>\n        The property <code>addstyle</code> and <code>addhoverstyle</code> we add custom styles for the splits. This way we can customize our splits or splits\n    </p>\n    <p>\n        With class <code>.box4</code> We define the initial width of each div\n    </p>\n\n</div>\n</div>\n    <div splitterDirective [addstyle]=\"'border-left-color:black;border-left-width:10px'\" [addhoverstyle]=\"'border-left-color:yellow;border-left-width:10px'\" [size]=\"'200px'\" >\n        <div class=\"box4\"></div>\n        <div class=\"box4\"></div>\n        <div class=\"box4\"></div>\n        <div class=\"box4\"></div>\n    </div>\n    <br>\n    <br>\n    <div class=\"boxcomment\">\n    <div class=\"code\">\n    <pre><code>\n        &lt;style&gt;\n           {{\".mainboxV{\n                height:400px;\n            }\n            .boxv {\n                height:33%;\n                border:solid black 1px;\n            }\n            .boxvmenu{\n                height: 100px;\n                border:solid black 1px;\n            \n            }\n            \"}}\n        &lt;/style&gt;\n        &lt;div splitterDirective [vertical]=&quot;true&quot; class=&quot;mainboxV&quot;  [size]=&quot;'400px'&quot;&gt;\n            &lt;div class=&quot;boxv&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;boxv&quot;&gt;&lt;/div&gt;\n            &lt;div class=&quot;boxv&quot;&gt;&lt;/div&gt;\n        &lt;/div&gt;\n\n    </code></pre>\n    </div>\n    <div class=\"comment\">\n        <p>In this example we split in vertical mode setting a size of <code>600px</code> that in vertical case is the width.</p>\n        <p>Class <code>.mainboxV</code> set the style of the main container</p>\n        <p>Class <code>.boxvmenu</code> and boxv we set the initial height and style of the splits</p>\n    </div>\n</div>  \n    <div splitterDirective [vertical]=\"true\" class=\"mainboxV\"  [size]=\"'600px'\">\n        <div class=\"boxvmenu \"></div>\n        <div class=\"boxv\"></div>\n        <div class=\"boxvmenu\"></div>\n    </div>\n    <br>\n    <br>\n    <pre><code></code></pre>\n    \n\n",
                    styles: [".boxcomment{display:flex;flex-direction:row}.comment{flex:1;overflow:auto}.code{flex:0 auto;padding:0 40px;overflow:auto}.mainbox{width:500px;height:300px}.boxmenu{width:20%}.box,.boxmenu{border:1px solid #000}.box{width:60%}.box4{width:25%}.box4,.boxv{border:1px solid #000}.boxv{flex:1 0 auto}.boxvmenu{height:100px;border:1px solid #000}.boxb{background-color:#00f}.boxr{background-color:red}.boxg{background-color:green}.mainboxV{height:400px}"]
                },] }
    ];
    TestComponentComponent.ctorParameters = function () { return []; };

    var SplitterDirectiveModule = /** @class */ (function () {
        function SplitterDirectiveModule() {
        }
        return SplitterDirectiveModule;
    }());
    SplitterDirectiveModule.decorators = [
        { type: core.NgModule, args: [{
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

    exports.SplitterDirective = SplitterDirective;
    exports.SplitterDirectiveModule = SplitterDirectiveModule;
    exports.ɵa = TestComponentComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=splitter-directive.umd.js.map
