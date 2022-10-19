import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTransferMappingComponent } from './master-transfer-mapping.component';

describe('MasterTransferMappingComponent', () => {
  let component: MasterTransferMappingComponent;
  let fixture: ComponentFixture<MasterTransferMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTransferMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterTransferMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
