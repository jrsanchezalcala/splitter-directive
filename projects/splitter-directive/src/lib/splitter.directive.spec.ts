import { SplitterDirective } from './splitter.directive';
import{ ElementRef } from '@angular/core';

describe('SplitterDirective', () => {
  it('should create an instance', () => {
    let div  = document.createElement("div");
    let ref = new ElementRef(div);
    const directive = new SplitterDirective(ref,document);
    expect(directive).toBeTruthy();
  });
});
