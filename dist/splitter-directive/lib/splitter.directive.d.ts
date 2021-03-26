import { EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
/** @dynamic */
export declare class SplitterDirective {
    private el;
    private document;
    vertical: boolean;
    private parentPosition;
    private parent;
    private splits;
    private size;
    private splitclass;
    private addstyle;
    private addhoverstyle;
    private observer;
    onDropSplitter: EventEmitter<any>;
    constructor(el: ElementRef, document: Document);
    ngOnInit(): void;
    init(): void;
    getSplitter(): HTMLElement;
    getPercentage(pixel: any): number;
    getPercentageHeight(pixel: any): number;
    addMutations(): void;
    reset(): void;
    getStyle(className: any): string;
}
