import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //apiURL : string = 'https://gal-distribution-pipeline-api20220706135228.azurewebsites.net/';
  apiURL : string = 'https://localhost:44311/api/';
  transferApiURI : string = 'https://localhost:44329/api/transfer';
  masterTransferURI : string = 'https://localhost:44329/api/MasterTransfer';
  masterTransferMappingURI : string = 'https://localhost:44329/api/MasterTransferMappings';


  constructor(private http: HttpClient) {

  }
  // postProduct(data: any) {
  //   //return this.http.post<any>("http://localhost:3000/productList/", data);
  //   return this.http.post<any>(this.apiURL + "productList/", data);

  // }
  // getProduct() {
  //   return this.http.get<any>(this.apiURL + "productList/");
  // }
  // putProduct(data: any,id:any) {
  //   return this.http.put<any>(this.apiURL + "productList/"+id, data);
  // }

  // deleteProduct(id:any) {
  //   return this.http.delete<any>(this.apiURL + "productList/"+id);
  // }

  getAllMasterTransfers() {
    return this.http.get<any>(this.masterTransferURI +"/");
  }

  getMasterTransferMappings() {
    let data="-1,-11";
    return this.http.get<any>(this.masterTransferMappingURI);
   //return this.http.get<any>('https://localhost:44329/api/MasterTransferMappings/-1%2C-11?masterTransferId=-1&transferId=-11');
  }
  
  getIsExistsMasterTransferMappings(masterTransferId : number,transferId :number) {
    let data;
    let params = new HttpParams()
    .set('masterTransferId', masterTransferId)
    .set('transferId', transferId);

    return this.http.get(this.masterTransferMappingURI+'/IsExists', { params: params })
    //return this.http.get<any>(this.masterTransferMappingURI + '/IsExists?masterTransferId=-1&transferId=-11');
   //return this.http.get<any>('https://localhost:44329/api/MasterTransferMappings/-1%2C-11?masterTransferId=-1&transferId=-11');
  }

  addMasterTransferMappings(data : any) {    
    //return this.http.post<any>(this.masterTransferMappingURI+'/IsExists', { params: params })
    // let data;
    // let params = new HttpParams()
    // .set('masterTransferId', masterTransferId)
    // .set('transferId', transferId)
    // .set('transferSequence', '')
    // .set('isTransferEnabled', true);
    return this.http.post<any>(this.masterTransferMappingURI, data);
  }

  updateMasterTransferMappings(data: any) {
    // return this.http.put<any>(this.apiURL + "transfers/"+id, data);
    return this.http.put<any>(this.masterTransferMappingURI, data);
  }

  deleteMasterTransferMappings(masterTransferIdId:any,transferId : any) {
    return this.http.delete<any>(this.masterTransferMappingURI + "/"+ masterTransferIdId + "/"+transferId);
  }

  getAllTransfers() {
    return this.http.get<any>(this.transferApiURI +"/");
  }  
  
 
  getChildTransfers(id:any) {
    //return this.http.get<any>(this.apiURL + "transfers?transferId=" + id,);
    return this.http.get<any>(this.transferApiURI + "/" + id);
  }

  getTransfers() {
    return this.http.get<any>(this.transferApiURI +"/getTransfers");
  }

  addTransfer(data: any) {
    // return this.http.post<any>(this.apiURL + "transfers/", data);
    return this.http.post<any>(this.transferApiURI, data);

  }

  updateTransfers(data: any,id:any) {
    // return this.http.put<any>(this.apiURL + "transfers/"+id, data);
    return this.http.put<any>(this.transferApiURI + "/"+id, data);

  }

  deleteTransfer(id:any) {
    // return this.http.delete<any>(this.apiURL + "transfers/"+id);
    return this.http.delete<any>(this.transferApiURI + "/"+id);

  }

}
