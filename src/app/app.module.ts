import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { TransfersComponent } from './transfers/transfers/transfers.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TestUiComponent } from './test-ui/test-ui.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { TestUi2Component } from './test-ui2/test-ui2.component';
import { ConfigSettingsComponent } from './config-settings/config-settings.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MasterTransferComponent } from './master-transfer/master-transfer.component';
import {MatListModule} from '@angular/material/list';
import { MasterTransferMappingDetailsComponent } from './master-transfer-mapping-details/master-transfer-mapping-details.component';
import { MasterTransferMappingComponent } from './master-transfer-mapping/master-transfer-mapping.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TransfersComponent,
    ConfirmDialogComponent,
    TestUiComponent,
    ErrorPageComponent,
    TestUi2Component,
    ConfigSettingsComponent,
    MasterTransferComponent,
    MasterTransferMappingDetailsComponent,
    MasterTransferMappingComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule  
,MatSelectModule,MatDatepickerModule,MatNativeDateModule 
,MatRadioModule,ReactiveFormsModule,FormsModule,HttpClientModule,MatTableModule
,MatPaginatorModule,MatSortModule,MatProgressSpinnerModule,MatSidenavModule,MatTableModule,
MatListModule

// RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
