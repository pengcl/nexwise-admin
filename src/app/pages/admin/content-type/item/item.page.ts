import {Component, HostBinding, Injector} from '@angular/core';

import {AppItemBaseComponent} from '../../../../@shared/components/base/base.component';
import {UploadService} from '../../../../@shared/components/uploader/upload.service';
import {ContentTypeService} from '../../../../@core/services/contentType.service';


@Component({
  selector: 'app-admin-content-type-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminContentTypeItemPage extends AppItemBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  orderKeys = [
    'name_' + this.lan,
    'code',
  ];
  menu = this.route.snapshot.queryParams.menu;

  constructor(injector: Injector,
              private uploadSvc: UploadService,
              public contentTypeSvc: ContentTypeService) {
    super(injector);
    this.init('content-type', this.orderKeys);
  }

  filterCustomType(): void {
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    this.submit(this.contentTypeSvc);
  }
}
