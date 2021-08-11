import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminAddressItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminAddressItemPage}])
  ],
  declarations: [AdminAddressItemPage]
})
export class AdminAddressItemPageModule {
}
