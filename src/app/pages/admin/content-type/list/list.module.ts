import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../@shared/shared.module';
import {AdminContentTypeListPage} from './list.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: AdminContentTypeListPage}])
  ],
  declarations: [AdminContentTypeListPage]
})
export class AdminContentTypeListPageModule {
}
