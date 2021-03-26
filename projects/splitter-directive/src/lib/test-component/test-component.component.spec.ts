import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitterDirective } from '../splitter.directive';

import { TestComponentComponent } from './test-component.component';

describe('TestComponentComponent', () => {
  let component: TestComponentComponent;
  let fixture: ComponentFixture<TestComponentComponent>;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponentComponent, SplitterDirective ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(TestComponentComponent);
    fixture.detectChanges(); 
  });

  it('should create', () => {
    debugger;
    
    expect(fixture).toBeTruthy();
  });
});
