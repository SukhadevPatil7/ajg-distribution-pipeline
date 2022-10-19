import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterTransferModel } from '../dtModel/masterTransfer.model';
import { Transfer } from '../dtModel/transfer.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-master-transfer',
  templateUrl: './master-transfer.component.html',
  styleUrls: ['./master-transfer.component.css']
})
export class MasterTransferComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  typesOfShoes1: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  displayedColumns: string[] = [ 'MasterTransferName', 'ConfigValue','action'];
  lstTransfers : any;
  lstChildTransfers : any;
  lstMasterTransfers : any;
  lstSelectedChildTransfers: string[]=[];
  modelTransfer !: Transfer ;
  dataSource !: MatTableDataSource<any>;
  dataSourceMaster!: MatTableDataSource<any>;
  TransfersForm !: FormGroup;
  selectedTransfer : any;
  showSpinner : boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  lstctrans = new FormControl();
  
  masterTransferId : any;
  transferId : any ;
  isEnabled : boolean = false;


  constructor(private dialog:MatDialog,private api: ApiService,private formBuilder: FormBuilder)
  {
  }
  ngOnInit(): void {
    this.GetMasterTransferMappings();
    this.lstctrans.setValue([1,2,3]);
    this.GetAllTransfers();
    this.GetAllMasterTransfers();
    this.GetTransfers(0);
    console.log('masters');
    console.log(this.lstctrans.value);
  }
  
  MapRecord()
  {    
    let masterTransferModel = new MasterTransferModel(this.masterTransferId,this.transferId,'',true);

    
    // this.masterTransferModel.masterTransferId = this.masterTransferId;
    // this.masterTransferModel.transferId = this.transferId;
    // this.masterTransferModel.transferSequence = 'string';
    // this.masterTransferModel.isTransferEnabled = true;
    this.api.addMasterTransferMappings(masterTransferModel)
          .subscribe({
            next: (res) => {
              if(res == 1)
              {
                // alert('Record mapped successfully');             
              }
              else
              // alert('mapping already exists');     
              this.isEnabled = false;        


            },
            error: (err) => {
              alert('Error : ')
            }
          });
  }
  GetAllMasterTransfers()
  {
    return this.api.getAllMasterTransfers()
    .subscribe(
      {
        next:(resMst)=>{
          this.lstMasterTransfers = resMst;


          // if (this.selectedTransfer === undefined)
          // this.selectedTransfer=resMst[0].transferId;

          //this.GetChildTransfers(this.selectedTransfer);
          //this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
          // this.dataSource = new MatTableDataSource(res);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        },
        error : (err)=>{
          alert("error which fetching records.");
        }
      }
    )
  }

  GetMasterTransferMappings()
  {
    this.api.getMasterTransferMappings()
    .subscribe(
      {
        next:(res)=>{
          //let dataSourceMaster : any = res;

          // this.lstTransfers = res;
          // if (this.selectedTransfer === undefined)
          // this.selectedTransfer=res[0].transferId;

          //this.GetChildTransfers(this.selectedTransfer);

          //this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
          this.dataSourceMaster = new MatTableDataSource(res);
          this.dataSourceMaster.paginator = this.paginator;
          this.dataSourceMaster.sort = this.sort;
        },
        error : (err)=>{
          alert("error which fetching records.");
        }
      }
    )

  }

  GetAllTransfers()
  {

    return this.api.getAllTransfers()
    .subscribe(
      {
        next:(res)=>{
          this.lstTransfers = res;
          if (this.selectedTransfer === undefined)
          this.selectedTransfer=res[0].transferId;

          //this.GetChildTransfers(this.selectedTransfer);

          //this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
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

  SetMasterTransferId(mstTransferId : any)
  {
      this.masterTransferId = mstTransferId;
      if(this.masterTransferId !== undefined && this.transferId !== undefined)
      {
        //this.isEnabled = true;
        this.isMappingExists();
      }
      else
      {
        this.isEnabled = false;
      }
  }

  SetTransferId(transId : any)
  {
      this.transferId = transId;
      if(this.masterTransferId !== undefined && this.transferId !== undefined)
      {
        //this.isEnabled = true;
        this.isMappingExists();
      }
      else
      {
        this.isEnabled = false;
      }
  }

  isMappingExists()
  { 
    this.api.getIsExistsMasterTransferMappings(this.masterTransferId,this.transferId)
    .subscribe(
      {
        next:(res)=>{
          let test : any = res;
          if(res)
          {
              //alert('mapping exists')
              this.isEnabled = false;
          }
          else
          {
              //alert('mapping does not exists')
              this.isEnabled = true;
          }
          // this.lstTransfers = res;
          // if (this.selectedTransfer === undefined)
          // this.selectedTransfer=res[0].transferId;

          //this.GetChildTransfers(this.selectedTransfer);

          //this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
        
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
          this.modelTransfer = res;
          let myArray = [];
myArray.push(res);
console.log(myArray);
          //this.lstTransfers = res;
         // this.dataSource = new MatTableDataSource(res);
          //this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
          //this.selectedTransfer = 2;
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          // this.showSpinner = false;
        },
        error : (err)=>{
          alert("error which fetching records.");
        }
      }
    )
  }

  GetTransfers(id:any)
  {
    this.selectedTransfer = id;
    //this.showSpinner = true;
    return this.api.getTransfers()
    .subscribe(
      {
        next:(res)=>{
          this.lstChildTransfers= res;
          //this.dataSource = new MatTableDataSource(res);
          //this.TransfersForm.controls['TransferIds'].setValue(this.selectedTransfer);
          //this.selectedTransfer = 2;
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
          //this.showSpinner = false;
        },
        error : (err)=>{
          alert("error which fetching records.");
        }
      }
    )
  }

  Test(event:any)
  {
    //this.lstSelectedChildTransfers.push(id);
    //console.log(this.lstSelectedChildTransfers);
    //console.log(this.lstctrans.selectedOptions);
    console.log(event);
  }
  onSelection(e:any, v:any){
    console.log(e,v);
    console.log(e.options[0]._value,e.options[0]._selected);

   }


   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMaster.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMaster.paginator) {
      this.dataSourceMaster.paginator.firstPage();
    }
  }



}



