import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDemoComponentComponent } from './simple-demo-component.component';

describe('SimpleDemoComponentComponent', () => {
  let component: SimpleDemoComponentComponent;
  let fixture: ComponentFixture<SimpleDemoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDemoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDemoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
