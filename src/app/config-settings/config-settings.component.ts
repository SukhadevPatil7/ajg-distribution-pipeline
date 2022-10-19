import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ApiService } from '../services/api.service';
import { TransfersComponent } from '../transfers/transfers/transfers.component';

@Component({
  selector: 'app-config-settings',
  templateUrl: './config-settings.component.html',
  styleUrls: ['./config-settings.component.css']
})
export class ConfigSettingsComponent implements OnInit {

  title = 'wre-distribution-pipeline';
  // displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','comments','date','action'];
  displayedColumns: string[] = [ 'ConfigName', 'ConfigValue','action'];
  lstTransfers : any;
  dataSource !: MatTableDataSource<any>;
  TransfersForm !: FormGroup;  
  selectedTransfer : any;
  showSpinner : boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog:MatDialog,private api: ApiService
  ,
  private formBuilder: FormBuilder
  //, 
    //private dialogRef: MatDialogRef<TransfersComponent>,
    //@Inject(MAT_DIALOG_DATA) public editData: any
  ){

}

  ngOnInit(): void {
    
    //this.getAllProduct();
    this.getAllTransfers();
    this.TransfersForm = this.formBuilder.group({
      TransferIds: ['']
    });

  }

  
  openDialog() {
    this.dialog.open(TransfersComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save')
      {
        this.getAllTransfers();
        this.GetChildTransfers(this.selectedTransfer);
      }
    });
  }

  openConfirmDialog(enterAnimationDuration: string, exitAnimationDuration: string,transferConfigItemId : any): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(val=>{
      {
        //alert(val);
        if(val.toLowerCase()=='yes')
        {
          this.deleteTransfer(transferConfigItemId);
        }
      }
    });
  }


  // deleteTransfer(id: number){
  //   this.openDialog1('0ms','0ms')
  // }



  editTransfer(row : any){
    this.dialog.open(TransfersComponent,{
      width:'30%',
      data:[row,'edit']

    }
    ).afterClosed().subscribe(val=>{
      if(val==='update')
      {
        this.getAllTransfers();
        this.GetChildTransfers(this.selectedTransfer);
        this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);

      }
    });

  }

  addTransfer(){
    this.dialog.open(TransfersComponent,{
      width:'30%',
      data:[this.selectedTransfer,'add']
    }
    ).afterClosed().subscribe(val=>{
      if(val==='update' || val=='save') 
      {
        this.getAllTransfers();
        this.GetChildTransfers(this.selectedTransfer);
        this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
      }
    });

  }





  deleteTransfer(id: number){
    this.api.deleteTransfer(id)
    .subscribe({
        next:(res)=>
        {
          alert("record deleted sucessful");
          this.getAllTransfers();
          this.GetChildTransfers(this.selectedTransfer);
        },
        error:()=>{
          alert("error while deleting data")
        }
        
      }
    )
   

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // getAllProduct()
  // {
  //   return this.api.getProduct()
  //   .subscribe(
  //     {
  //       next:(res)=>{
  //         console.log(res);
  //         this.dataSource = new MatTableDataSource(res);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       },
  //       error : (err)=>{
  //         alert("error which fetching records.");
  //       }
  //     }
  //   )
  // }

  getAllTransfers()
  {
    return this.api.getAllTransfers()
    .subscribe(
      {
        next:(res)=>{
          this.lstTransfers = res;
          if (this.selectedTransfer === undefined)
          this.selectedTransfer=res[0].transferId;
          
          this.GetChildTransfers(this.selectedTransfer);
          
          this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error : (err)=>{
          alert("error which fetching records.");
        }
      }
    )
  }  

  GetChildTransfers(id:any)
  {   
    this.selectedTransfer = id;
    this.showSpinner = true;
    return this.api.getChildTransfers(id)
    .subscribe(
      {
        next:(res)=>{
          //this.lstTransfers = res;
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
          //this.selectedTransfer = 2;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.showSpinner = false;
          
        },
        error : (err)=>{
          alert("error which fetching records.");
        }
      }
    )
  } 
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './../dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}