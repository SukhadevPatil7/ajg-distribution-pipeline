import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTransferMappingDetailsComponent } from './master-transfer-mapping-details.component';

describe('MasterTransferMappingDetailsComponent', () => {
  let component: MasterTransferMappingDetailsComponent;
  let fixture: ComponentFixture<MasterTransferMappingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTransferMappingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterTransferMappingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
