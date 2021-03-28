# SplitterDirective

Directive for angular that makes inner divs resizable on width or height (depending on vertical mode or not) and at the same time resizing its sibling to not overpass the limits of its parent . Useful for menus of an editor for example

## Get Started
-1 Install splitter-directive module with 
```
npm install splitter-directive --save
``` 

-2 Import SplitterDirectiveModule module.
```
@NgModule({ 
    imports : [SplitterDirectiveModule] , 
    .......
})
```

-3 add splitterDirective to the parent element that is going to contain splits.

```
<div splitterDirective>
    <div class="split1"></div>
    <div class="split2"></div>
    <div class="split3"></div>
</div>
```

See Demos at https://jrsanchezalcala.github.io/splitter-directive/index.html

## Inputs

-Vertical mode :  use property "vertical"
```
<div splitterDirective [vertical]="'true'" >
```
-Size heigth if it's normal mode and width if it's in vertical mode with property "size". You can also size the main box also with css seting a custom class if it's easy for you
```
<div splitterDirective [size]="'1100px'">
```

-If you want to add custom style to the splits use properties "addstyle" and "addhoverstyle"
```
<div splitterDirective [addstyle]="'border-left-color:black;border-left-width:10px'" [addhoverstyle]="'border-left-color:yellow;border-left-width:10px'">
```  

## Build

Run `ng build splitterDirective` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test splitterDirective` to execute the unit tests via [Karma](https://karma-runner.github.io).

