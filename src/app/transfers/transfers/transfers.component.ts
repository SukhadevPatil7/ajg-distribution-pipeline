import { Component, Inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  //lstTransfers = ["Brand New", "Second Hand", "Refurbished"];
  
  lstTransfers : any;
  selectedTransfer : any;
  dataSource !: MatTableDataSource<any>;

  TransferForm !: FormGroup;
  actionBtn: string = "Save";
  action: string = "Add";

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private dialogRef: MatDialogRef<TransfersComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {

  };
  ngOnInit(): void {
    this.getAllTransfers();

    this.TransferForm = this.formBuilder.group({
      TransferConfigItemId: [0],
      TransferId: [0, Validators.required],
      ConfigName: ['', Validators.required],
      ConfigValue: ['', Validators.required]
    });

    if (this.editData) {
      if(this.editData[1]=='edit')
      {
        this.actionBtn = "Update";
        this.action = "Update";

        this.TransferForm.controls['TransferConfigItemId'].setValue(this.editData[0].transferConfigItemId);
        this.TransferForm.controls['ConfigName'].setValue(this.editData[0].configName);
        this.TransferForm.controls['ConfigValue'].setValue(this.editData[0].configValue);
        this.TransferForm.controls['TransferId'].setValue(this.editData[0].transferId);      
        this.selectedTransfer = this.editData[0].transferId; 
      }
      else{
      this.TransferForm.controls['TransferId'].setValue(this.editData[0]);      
      this.selectedTransfer = this.editData[0];
      }
    }
  }
  addTransfer() {
    if (!this.editData || this.editData[1]==='add') {
      if (this.TransferForm.valid) {
        this.api.addTransfer(this.TransferForm.value)
          .subscribe({
            next: (res) => {
              alert('Record added successfully');
              this.TransferForm.reset();
              this.dialogRef.close('save');
            },
            error: (err) => {
              alert('Error : ')
            }
          });
      }
    }
      else
      {
        this.updateProduct();
      }
    
  }
  updateProduct()
  {
    this.api.updateTransfers(this.TransferForm.value,this.TransferForm.value['TransferConfigItemId'])
    .subscribe({
      next:(res)=>{
        alert('Record updated successfully.');
        this.TransferForm.reset();
        this.dialogRef.close('update');

      },
      error:(err)=>{
        alert("error while updateing the record" + err)
      }
    })
    
  }
  getAllTransfers()
  {
    return this.api.getAllTransfers()
    .subscribe(
      {
        next:(res)=>{
          this.lstTransfers = res;
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          
        },
        error : (err)=>{
          alert("error which fetching records.");
        }
      }
    )
  }  
  

}