import { Component, Inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-master-transfer-mapping',
  templateUrl: './master-transfer-mapping.component.html',
  styleUrls: ['./master-transfer-mapping.component.css']
})
export class MasterTransferMappingComponent implements OnInit {

  lstTransfers : any;
  selectedTransfer : any;
  dataSource !: MatTableDataSource<any>;

  MTMappingForm !: FormGroup;
  actionBtn: string = "Save";
  action: string = "Add";

  IsTransferEnabledVal = true;

constructor(private formBuilder: FormBuilder, private api: ApiService,
    private dialogRef: MatDialogRef<MasterTransferMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {

  };
  ngOnInit(): void {

    this.MTMappingForm = this.formBuilder.group({
      MasterTransferId: [0],
      TransferId: [0],
      TransferSequence: ['', Validators.required],
      IsTransferEnabled: [true, Validators.required]
    });

    if (this.editData) {
     
        this.actionBtn = "Update";
        this.action = "Update";

        this.MTMappingForm.controls['MasterTransferId'].setValue(this.editData[0].masterTransferId);
        this.MTMappingForm.controls['TransferId'].setValue(this.editData[0].transferId);
        this.MTMappingForm.controls['TransferSequence'].setValue(this.editData[0].transferSequence);
        this.MTMappingForm.controls['IsTransferEnabled'].setValue(this.editData[0].isTransferEnabled);      
        
        this.IsTransferEnabledVal = this.editData[0].isTransferEnabled;  
  
    }

  }


  UpdateMTTMapping() {
    //alert(JSON.stringify(this.MTMappingForm.value));
    if (this.MTMappingForm.valid) {
      this.api.updateMasterTransferMappings(this.MTMappingForm.value)
        .subscribe({
          next: (res) => {
            alert('Record added successfully');
            this.MTMappingForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Error : ')
          }
        });
    }
  }

  
}
