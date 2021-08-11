import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminContentTypeItemPage} from './item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminContentTypeItemPage}])
  ],
  declarations: [AdminContentTypeItemPage]
})
export class AdminContentTypeItemPageModule {
}
