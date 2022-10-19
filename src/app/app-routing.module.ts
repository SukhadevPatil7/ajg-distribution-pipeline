import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigSettingsComponent } from './config-settings/config-settings.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MasterTransferMappingDetailsComponent } from './master-transfer-mapping-details/master-transfer-mapping-details.component';
import { MasterTransferComponent } from './master-transfer/master-transfer.component';
import { TestUiComponent } from './test-ui/test-ui.component';
import { TestUi2Component } from './test-ui2/test-ui2.component';


const routes: Routes = [
  {
    path: '',redirectTo : 'Transfer', pathMatch:'full'
  },
  {
    path: 'Transfer', component: ConfigSettingsComponent
  },
  {
    path: 'MasterTransfer', component: MasterTransferComponent
  },
  {
    path: 'MasterTransferMapping', component: MasterTransferMappingDetailsComponent
  },
  {
    path: '**', component: ErrorPageComponent    // Wildcard route for a 404 page
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
