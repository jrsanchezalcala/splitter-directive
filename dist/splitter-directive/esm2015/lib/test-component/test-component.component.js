import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../splitter.directive";
export class TestComponentComponent {
    constructor() { }
    ngOnInit() {
    }
}
TestComponentComponent.ɵfac = function TestComponentComponent_Factory(t) { return new (t || TestComponentComponent)(); };
TestComponentComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TestComponentComponent, selectors: [["lib-test-component"]], decls: 89, vars: 8, consts: [[1, "boxcomment"], [1, "code"], [1, "comment"], ["splitterDirective", "", 1, "mainbox"], [1, "boxmenu"], [1, "box"], ["splitterDirective", "", 3, "addstyle", "addhoverstyle", "size"], [1, "box4"], ["splitterDirective", "", 1, "mainboxV", 3, "vertical", "size"], [1, "boxvmenu"], [1, "boxv"]], template: function TestComponentComponent_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
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
    } }, directives: [i1.SplitterDirective], styles: [".boxcomment[_ngcontent-%COMP%]{display:flex;flex-direction:row}.comment[_ngcontent-%COMP%]{flex:1;overflow:auto}.code[_ngcontent-%COMP%]{flex:0 auto;padding:0 40px;overflow:auto}.mainbox[_ngcontent-%COMP%]{width:500px;height:300px}.boxmenu[_ngcontent-%COMP%]{width:20%}.box[_ngcontent-%COMP%], .boxmenu[_ngcontent-%COMP%]{border:1px solid #000}.box[_ngcontent-%COMP%]{width:60%}.box4[_ngcontent-%COMP%]{width:25%}.box4[_ngcontent-%COMP%], .boxv[_ngcontent-%COMP%]{border:1px solid #000}.boxv[_ngcontent-%COMP%]{flex:1 0 auto}.boxvmenu[_ngcontent-%COMP%]{height:100px;border:1px solid #000}.boxb[_ngcontent-%COMP%]{background-color:#00f}.boxr[_ngcontent-%COMP%]{background-color:red}.boxg[_ngcontent-%COMP%]{background-color:green}.mainboxV[_ngcontent-%COMP%]{height:400px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestComponentComponent, [{
        type: Component,
        args: [{
                selector: 'lib-test-component',
                templateUrl: './test-component.component.html',
                styleUrls: ['./test-component.component.css']
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3BsaXR0ZXItZGlyZWN0aXZlL3NyYy9saWIvdGVzdC1jb21wb25lbnQvdGVzdC1jb21wb25lbnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3BsaXR0ZXItZGlyZWN0aXZlL3NyYy9saWIvdGVzdC1jb21wb25lbnQvdGVzdC1jb21wb25lbnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7O0FBT2xELE1BQU0sT0FBTyxzQkFBc0I7SUFFakMsZ0JBQWdCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7OzRGQUxVLHNCQUFzQjsyREFBdEIsc0JBQXNCO1FDUG5DLDBCQUFJO1FBQUEsdUNBQXVCO1FBQUEsaUJBQUs7UUFDaEMsOEJBQXdCO1FBQ3hCLDhCQUFrQjtRQUNsQiwyQkFBSztRQUFBLDRCQUFNO1FBQ1AsWUFvQko7UUFBQSxpQkFBTztRQUFBLGlCQUFNO1FBQ2IsaUJBQU07UUFDTiw4QkFBcUI7UUFDakIseUJBQUc7UUFBQSwwRUFBMEQ7UUFBQSxpQkFBSTtRQUNqRSwwQkFBRztRQUFBLDRCQUFXO1FBQUEsNkJBQU07UUFBQSx5QkFBUTtRQUFBLGlCQUFPO1FBQUMsK0lBQTZIO1FBQUEsaUJBQUk7UUFDckssMEJBQUc7UUFBQSw0QkFBVztRQUFBLDZCQUFNO1FBQUEscUJBQUk7UUFBQSxpQkFBTztRQUFDLHNCQUFJO1FBQUEsNkJBQU07UUFBQSx5QkFBUTtRQUFBLGlCQUFPO1FBQUMsbUVBQWlEO1FBQUEsaUJBQUk7UUFDbkgsaUJBQU07UUFDTixpQkFBTTtRQUNGLCtCQUF3QztRQUNwQywwQkFBMkI7UUFDM0IsMEJBQXVCO1FBQ3ZCLDBCQUEyQjtRQUMvQixpQkFBTTtRQUNOLHNCQUFJO1FBQ0osc0JBQUk7UUFDUiwrQkFBd0I7UUFDcEIsK0JBQWtCO1FBQ2xCLDRCQUFLO1FBQUEsNkJBQU07UUFDUCxhQWNKO1FBQUEsaUJBQU87UUFBQSxpQkFBTTtRQUNqQixpQkFBTTtRQUNOLCtCQUFxQjtRQUNqQiwwQkFBRztRQUNDLGlEQUErQjtRQUFBLDZCQUFNO1FBQUEscUJBQUk7UUFBQSxpQkFBTztRQUFDLG1FQUNyRDtRQUFBLGlCQUFJO1FBQ0osMEJBQUc7UUFDQywrQkFBYTtRQUFBLDZCQUFNO1FBQUEseUJBQVE7UUFBQSxpQkFBTztRQUFDLHNCQUFJO1FBQUEsNkJBQU07UUFBQSw4QkFBYTtRQUFBLGlCQUFPO1FBQUMsc0dBQ3RFO1FBQUEsaUJBQUk7UUFDSiwwQkFBRztRQUNDLDZCQUFXO1FBQUEsNkJBQU07UUFBQSxzQkFBSztRQUFBLGlCQUFPO1FBQUMsMERBQ2xDO1FBQUEsaUJBQUk7UUFFUixpQkFBTTtRQUNOLGlCQUFNO1FBQ0YsK0JBQTJLO1FBQ3ZLLDBCQUF3QjtRQUN4QiwwQkFBd0I7UUFDeEIsMEJBQXdCO1FBQ3hCLDBCQUF3QjtRQUM1QixpQkFBTTtRQUNOLHNCQUFJO1FBQ0osc0JBQUk7UUFDSiwrQkFBd0I7UUFDeEIsK0JBQWtCO1FBQ2xCLDRCQUFLO1FBQUEsNkJBQU07UUFDUCxhQXFCSjtRQUFBLGlCQUFPO1FBQUEsaUJBQU07UUFDYixpQkFBTTtRQUNOLCtCQUFxQjtRQUNqQiwwQkFBRztRQUFBLDZFQUE0RDtRQUFBLDZCQUFNO1FBQUEsc0JBQUs7UUFBQSxpQkFBTztRQUFDLHFEQUFtQztRQUFBLGlCQUFJO1FBQ3pILDBCQUFHO1FBQUEsdUJBQU07UUFBQSw2QkFBTTtRQUFBLDBCQUFTO1FBQUEsaUJBQU87UUFBQyxxREFBbUM7UUFBQSxpQkFBSTtRQUN2RSwwQkFBRztRQUFBLHVCQUFNO1FBQUEsNkJBQU07UUFBQSwwQkFBUztRQUFBLGlCQUFPO1FBQUMsNEVBQTBEO1FBQUEsaUJBQUk7UUFDbEcsaUJBQU07UUFDVixpQkFBTTtRQUNGLCtCQUE0RTtRQUN4RSwwQkFBNkI7UUFDN0IsMkJBQXdCO1FBQ3hCLDBCQUE0QjtRQUNoQyxpQkFBTTtRQUNOLHNCQUFJO1FBQ0osc0JBQUk7UUFDSiw0QkFBSztRQUFBLHdCQUFhO1FBQUEsaUJBQU07O1FBbEh4QixlQW9CSjtRQXBCSSxpZkFvQko7UUFrQlEsZ0JBY0o7UUFkSSxzakJBY0o7UUFldUIsZ0JBQTZEO1FBQTdELDJFQUE2RCxvRUFBQSxpQkFBQTtRQVdoRixnQkFxQko7UUFyQkksMm1CQXFCSjtRQVF1QixnQkFBaUI7UUFBakIsK0JBQWlCLGlCQUFBOzt1RkR4Ry9CLHNCQUFzQjtjQUxsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7YUFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItdGVzdC1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGVzdC1jb21wb25lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90ZXN0LWNvbXBvbmVudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGVzdENvbXBvbmVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iLCI8aDE+RVhBTVBMRVMgVVNJTkcgU1BMSVRURVI8L2gxPlxuPGRpdiBjbGFzcz1cImJveGNvbW1lbnRcIj5cbjxkaXYgY2xhc3M9XCJjb2RlXCI+XG48cHJlPjxjb2RlPlxuICAgICZsdDtzdHlsZSZndDtcbiAgICAgIHt7XCIubWFpbmJveHtcbiAgICAgICAgICAgIHdpZHRoOjUwMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OjIwMHB4O1xuICAgICAgICB9XG4gICAgICAgIC5ib3htZW51e1xuICAgICAgICAgICAgd2lkdGg6MjAlO1xuICAgICAgICAgICAgYm9yZGVyOnNvbGlkIGJsYWNrIDFweDtcblxuICAgICAgICB9XG4gICAgICAgIC5ib3gge1xuICAgICAgICAgICAgd2lkdGg6NjAlO1xuICAgICAgICAgICAgYm9yZGVyOnNvbGlkIGJsYWNrIDFweDtcbiAgICAgICAgfVwifX1cbiAgICAmbHQ7L3N0eWxlJmd0O1xuICAgICZsdDtkaXYgc3BsaXR0ZXJEaXJlY3RpdmUgY2xhc3M9JnF1b3Q7bWFpbmJveCZxdW90OyAmZ3Q7XG4gICAgICAgICZsdDtkaXYgY2xhc3M9JnF1b3Q7Ym94bWVudSZxdW90OyZndDsmbHQ7L2RpdiZndDtcbiAgICAgICAgJmx0O2RpdiBjbGFzcz0mcXVvdDtib3gmcXVvdDsmZ3Q7Jmx0Oy9kaXYmZ3Q7XG4gICAgICAgICZsdDtkaXYgY2xhc3M9JnF1b3Q7Ym94bWVudSZxdW90OyZndDsmbHQ7L2RpdiZndDtcbiAgICAmbHQ7L2RpdiZndDtcbjwvY29kZT48L3ByZT5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImNvbW1lbnRcIj5cbiAgICA8cD5JbiB0aGlzIGV4YW1wbGUgd2UgY2FuIHNlZSBhIGJhc2ljIHVzZSBpbiBob3Jpem9udGFsIG1vZGUuPC9wPlxuICAgIDxwPldpdGggY2xhc3MgPGNvZGU+Lm1haW5ib3g8L2NvZGU+IHdlIHN0YWJsaXNoZWQgdGhlIG1haW4gc2l6ZSBvZiB0aGUgY29udGFpbmVyIG9mIGRpdnMgd2hhdCB3ZSBtdXN0IGhhdmUgdG8gZGVmaW5lIGZvciBhIGdvb2QgZnVuY3Rpb24gb2YgdGhlIHNwbGl0dGVyRGlyZWN0aXZlPC9wPlxuICAgIDxwPldpdGggY2xhc3MgPGNvZGU+LmJveDwvY29kZT4gYW5kIDxjb2RlPi5ib3htZW51PC9jb2RlPiB3ZSBzdGFibGlzaGVkIHRoZSBpbml0aWFsIHdpZHRoIG9mIHRoZSBlYWNoIGRpdi4gPC9wPlxuPC9kaXY+XG48L2Rpdj5cbiAgICA8ZGl2IHNwbGl0dGVyRGlyZWN0aXZlIGNsYXNzPVwibWFpbmJveFwiID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveG1lbnVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94bWVudVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxicj5cbiAgICA8YnI+XG48ZGl2IGNsYXNzPVwiYm94Y29tbWVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2RlXCI+XG4gICAgPHByZT48Y29kZT5cbiAgICAgICAgJmx0O3N0eWxlJmd0O1xuICAgICAgICAgICB7e1wiIC5ib3g0IHtcbiAgICAgICAgICAgICAgICB3aWR0aDoyNSU7XG4gICAgICAgICAgICAgICAgYm9yZGVyOnNvbGlkIGJsYWNrIDFweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFwifX1cbiAgICAgICAgJmx0Oy9zdHlsZSZndDtcbiAgICAgICAgJmx0O2RpdiBzcGxpdHRlckRpcmVjdGl2ZSBbYWRkc3R5bGVdPSZxdW90Oydib3JkZXItbGVmdC1jb2xvcjpibGFjaztib3JkZXItbGVmdC13aWR0aDoxMHB4JyZxdW90OyBcbiAgICAgICAgW2FkZGhvdmVyc3R5bGVdPSZxdW90Oydib3JkZXItbGVmdC1jb2xvcjp5ZWxsb3c7Ym9yZGVyLWxlZnQtd2lkdGg6MTBweCcmcXVvdDsgW3NpemVdPSZxdW90OycyMDBweCcmcXVvdDsgJmd0O1xuICAgICAgICAgICAgJmx0O2RpdiBjbGFzcz0mcXVvdDtib3g0JnF1b3Q7Jmd0OyZsdDsvZGl2Jmd0O1xuICAgICAgICAgICAgJmx0O2RpdiBjbGFzcz0mcXVvdDtib3g0JnF1b3Q7Jmd0OyZsdDsvZGl2Jmd0O1xuICAgICAgICAgICAgJmx0O2RpdiBjbGFzcz0mcXVvdDtib3g0JnF1b3Q7Jmd0OyZsdDsvZGl2Jmd0O1xuICAgICAgICAgICAgJmx0O2RpdiBjbGFzcz0mcXVvdDtib3g0JnF1b3Q7Jmd0OyZsdDsvZGl2Jmd0O1xuICAgICAgICAmbHQ7L2RpdiZndDtcbiAgICA8L2NvZGU+PC9wcmU+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJjb21tZW50XCI+ICAgXG4gICAgPHA+XG4gICAgICAgIEluIHRoaXMgZXhhbXBsZSB3ZSB1c2UgcHJvcGVyeSA8Y29kZT5zaXplPC9jb2RlPiB0byBsaW1pdCB0aGUgaGVpZ2h0IG9uIGhvcml6b250YWwgc3BsaXR0ZXIgbW9kZS4gXG4gICAgPC9wPlxuICAgIDxwPlxuICAgICAgICBUaGUgcHJvcGVydHkgPGNvZGU+YWRkc3R5bGU8L2NvZGU+IGFuZCA8Y29kZT5hZGRob3ZlcnN0eWxlPC9jb2RlPiB3ZSBhZGQgY3VzdG9tIHN0eWxlcyBmb3IgdGhlIHNwbGl0cy4gVGhpcyB3YXkgd2UgY2FuIGN1c3RvbWl6ZSBvdXIgc3BsaXRzIG9yIHNwbGl0c1xuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgICAgV2l0aCBjbGFzcyA8Y29kZT4uYm94NDwvY29kZT4gV2UgZGVmaW5lIHRoZSBpbml0aWFsIHdpZHRoIG9mIGVhY2ggZGl2XG4gICAgPC9wPlxuXG48L2Rpdj5cbjwvZGl2PlxuICAgIDxkaXYgc3BsaXR0ZXJEaXJlY3RpdmUgW2FkZHN0eWxlXT1cIidib3JkZXItbGVmdC1jb2xvcjpibGFjaztib3JkZXItbGVmdC13aWR0aDoxMHB4J1wiIFthZGRob3ZlcnN0eWxlXT1cIidib3JkZXItbGVmdC1jb2xvcjp5ZWxsb3c7Ym9yZGVyLWxlZnQtd2lkdGg6MTBweCdcIiBbc2l6ZV09XCInMjAwcHgnXCIgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94NFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94NFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94NFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94NFwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxicj5cbiAgICA8YnI+XG4gICAgPGRpdiBjbGFzcz1cImJveGNvbW1lbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29kZVwiPlxuICAgIDxwcmU+PGNvZGU+XG4gICAgICAgICZsdDtzdHlsZSZndDtcbiAgICAgICAgICAge3tcIi5tYWluYm94VntcbiAgICAgICAgICAgICAgICBoZWlnaHQ6NDAwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuYm94diB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OjMzJTtcbiAgICAgICAgICAgICAgICBib3JkZXI6c29saWQgYmxhY2sgMXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmJveHZtZW51e1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOnNvbGlkIGJsYWNrIDFweDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXCJ9fVxuICAgICAgICAmbHQ7L3N0eWxlJmd0O1xuICAgICAgICAmbHQ7ZGl2IHNwbGl0dGVyRGlyZWN0aXZlIFt2ZXJ0aWNhbF09JnF1b3Q7dHJ1ZSZxdW90OyBjbGFzcz0mcXVvdDttYWluYm94ViZxdW90OyAgW3NpemVdPSZxdW90Oyc0MDBweCcmcXVvdDsmZ3Q7XG4gICAgICAgICAgICAmbHQ7ZGl2IGNsYXNzPSZxdW90O2JveHYmcXVvdDsmZ3Q7Jmx0Oy9kaXYmZ3Q7XG4gICAgICAgICAgICAmbHQ7ZGl2IGNsYXNzPSZxdW90O2JveHYmcXVvdDsmZ3Q7Jmx0Oy9kaXYmZ3Q7XG4gICAgICAgICAgICAmbHQ7ZGl2IGNsYXNzPSZxdW90O2JveHYmcXVvdDsmZ3Q7Jmx0Oy9kaXYmZ3Q7XG4gICAgICAgICZsdDsvZGl2Jmd0O1xuXG4gICAgPC9jb2RlPjwvcHJlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50XCI+XG4gICAgICAgIDxwPkluIHRoaXMgZXhhbXBsZSB3ZSBzcGxpdCBpbiB2ZXJ0aWNhbCBtb2RlIHNldHRpbmcgYSBzaXplIG9mIDxjb2RlPjYwMHB4PC9jb2RlPiB0aGF0IGluIHZlcnRpY2FsIGNhc2UgaXMgdGhlIHdpZHRoLjwvcD5cbiAgICAgICAgPHA+Q2xhc3MgPGNvZGU+Lm1haW5ib3hWPC9jb2RlPiBzZXQgdGhlIHN0eWxlIG9mIHRoZSBtYWluIGNvbnRhaW5lcjwvcD5cbiAgICAgICAgPHA+Q2xhc3MgPGNvZGU+LmJveHZtZW51PC9jb2RlPiBhbmQgYm94diB3ZSBzZXQgdGhlIGluaXRpYWwgaGVpZ2h0IGFuZCBzdHlsZSBvZiB0aGUgc3BsaXRzPC9wPlxuICAgIDwvZGl2PlxuPC9kaXY+ICBcbiAgICA8ZGl2IHNwbGl0dGVyRGlyZWN0aXZlIFt2ZXJ0aWNhbF09XCJ0cnVlXCIgY2xhc3M9XCJtYWluYm94VlwiICBbc2l6ZV09XCInNjAwcHgnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3h2bWVudSBcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveHZcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveHZtZW51XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGJyPlxuICAgIDxicj5cbiAgICA8cHJlPjxjb2RlPjwvY29kZT48L3ByZT5cbiAgICBcblxuIl19