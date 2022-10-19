import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUi2Component } from './test-ui2.component';

describe('TestUi2Component', () => {
  let component: TestUi2Component;
  let fixture: ComponentFixture<TestUi2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestUi2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestUi2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
