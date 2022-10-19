import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTransferComponent } from './master-transfer.component';

describe('MasterTransferComponent', () => {
  let component: MasterTransferComponent;
  let fixture: ComponentFixture<MasterTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
