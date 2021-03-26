
import { DOCUMENT } from '@angular/common';
import {EventEmitter, Inject, Input, Output} from '@angular/core';
import{ ElementRef } from '@angular/core';
import {Directive} from '@angular/core';
/** @dynamic */
@Directive({
    selector : '[splitterDirective]'
})
export class SplitterDirective {
    @Input() vertical : boolean = false;
    private parentPosition;
    private parent;
    private splits = [];
    @Input() private size = null;
    @Input() private splitclass = null;
    @Input() private addstyle = null;
    @Input() private addhoverstyle = null;

    private observer;
    @Output() onDropSplitter:EventEmitter<any> = new EventEmitter();
    
    constructor(private el: ElementRef,@Inject(DOCUMENT) private document : Document){
       
    }

    ngOnInit(){
      this.parent =  this.el.nativeElement;
      let style = "";
      style += this.vertical ? 
      `flex-wrap:nowrap;flex-direction:column;display-flex:!important;overflow-y:auto;${this.size ? `width: ${this.size}; max-width:${this.size};` : ``}` 
      : `flex-wrap:nowrap;display-flex:!important;overflow-x:auto;${this.size ? `height: ${this.size}; max-height : ${this.size};` : ``}`;
        style += "display:flex;flex-wrap:nowrap;";
        this.parent.style += style;
      console.log(this.getStyle("."+this.splitclass));
      this.init();
    }

    init(){
      
            this.parent.addEventListener("dragover",(event) => { event.preventDefault();})
            let childrens = this.parent.children.length;
            for(let i=1 ; i < childrens ; i++){
                let islast = i == childrens -1 ;
                let child = this.parent.children[i+this.splits.length];
                let split = this.getSplitter();
                this.parent.insertBefore(split,child);
                this.splits.push(split);
            }
            if(!this.observer){
                this.addMutations();
            }
        
        
    }

    getSplitter(){
        let split = this.document.createElement("split");
        split.classList.add("splitter");
        if(this.splitclass){
          split.classList.add(this.splitclass);
        }
        let style = ""
        if(this.vertical){
            split.classList.add("splittervertical");
            style += `border-bottom:solid 4px #DCDCDC;height:0px;max-height:0px;width:100%;display:inline-block;cursor:row-resize;`;
        }
        else{
            style += `border-left:solid 4px #DCDCDC;width:0px;max-width:0px;height:100%;display:inline-block;cursor:col-resize;`;
        }
        let hoverstyle = "";
        if(this.addhoverstyle){
          hoverstyle = style + this.addhoverstyle;
        }

        if(this.addstyle){
          style += this.addstyle;
        }
        
        split.setAttribute("style",style);
        split.setAttribute("draggable","true");
        split.draggable = true;
        split.addEventListener("mouseover",() => {
          split.classList.add("splitterhover");
          if(!this.vertical)
          split.style.borderLeftColor = "#6196B2";
          else
          split.style.borderBottomColor = "#6196B2";

          if(hoverstyle){
            split.setAttribute("style",hoverstyle);

          }
        });
        split.addEventListener("mouseout",() => {
          split.classList.remove("splitterhover");
          
          if(!this.vertical)
          split.style.borderLeftColor = "#DCDCDC";
          else
          split.style.borderBottomColor = "#DCDCDC";

          if(hoverstyle){
            split.setAttribute("style",style);

          }
        })

        let eventListener = (event) => {
          
            let dropx = event.pageX;
            let dropy = event.pageY;
            let splitwidth = split.offsetWidth;
            let prev : any = split.previousElementSibling;
            let next : any = split.nextElementSibling;
            prev.removeEventListener("drop",eventListener);
            next.removeEventListener("drop",eventListener);
            this.onDropSplitter.emit({event , split , prev, next});
            if(!this.vertical){
                let prevwidth,nextwidth;
                if(dropx < split.offsetLeft){
                    prevwidth = prev.clientWidth - (split.offsetLeft - dropx);
                    nextwidth = next.clientWidth + (split.offsetLeft - dropx);

                }
                else{
                    prevwidth = (prev.clientWidth)  + (dropx - split.offsetLeft);
                    nextwidth = (next.clientWidth) - (dropx - split.offsetLeft);
                }
                prev.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${prevwidth}px` : `0 1 ${prevwidth}px`
                next.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${nextwidth}px` : `0 1 ${nextwidth}px`
                prev.style.overflowX = "auto";
                next.style.overflowX="auto";
            }
            else{
                let prevheight,nextheight;
                if(dropy < split.offsetTop){
                    prevheight = prev.clientHeight - (split.offsetTop - dropy);
                    nextheight = next.clientHeight + (split.offsetTop - dropy);

                }
                else{
                    prevheight = prev.clientHeight + (dropy - split.offsetTop);
                    nextheight = next.clientHeight - (dropy - split.offsetTop);
                }
                prev.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${prevheight}px` : `0 1 ${prevheight}px`
                next.style.flex = next.hasAttribute("splitgrow") ? `1 0 ${nextheight}px` : `0 1 ${nextheight}px`
                prev.style.overflowY = "auto";
                next.style.overflowY="auto";
            }
      
        }

        split.addEventListener("dragstart", (event) => {
            let prev : any = split.previousElementSibling;
            let next : any = split.nextElementSibling;
            prev.addEventListener("drop",eventListener);
            next.addEventListener("drop",eventListener);
        })
        return split;
    }

    getPercentage(pixel){
        let width = this.parent.offsetWidth;
        return pixel/width*100;
    }
    getPercentageHeight(pixel){
        let height = this.parent.offsetHeight;
        return pixel/height*100;
    }

    addMutations(){
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                this.reset();
                this.init();
            })
        });
    
        let config = {childList : true};
        observer.observe(this.parent,config);
        this.observer = observer;
    }

    reset(){
        this.observer.disconnect();
        this.splits.forEach((item) => {
            this.parent.removeChild(item);
        });
        this.splits = [];
        this.observer = null;
    }

    

     getStyle(className) {
      var cssText = "";
      var classes : any= this.document.styleSheets[0].rules || this.document.styleSheets[0].cssRules;
      for (var x = 0; x < classes.length; x++) {        
          if (classes[x].selectorText == className) {
              cssText += classes[x].cssText || classes[x].style.cssText;
          }         
      }
      return cssText;
  }

}