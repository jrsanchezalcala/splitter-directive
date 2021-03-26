import { NgModule } from '@angular/core';
import { SplitterDirective } from './splitter.directive';
import { TestComponentComponent } from './test-component/test-component.component';



@NgModule({
  declarations: [ SplitterDirective, TestComponentComponent],
  imports: [
  ],
  exports: [SplitterDirective]
})
export class SplitterDirectiveModule { }
