import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminAddressListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminAddressListPage}])
  ],
  declarations: [AdminAddressListPage]
})
export class AdminAddressListPageModule {
}
