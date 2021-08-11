import {Component, HostBinding, Injector} from '@angular/core';
import {UploadResult} from 'ngx-markdown-editor';
import {AppItemBaseComponent} from '../../../../@shared/components/base/base.component';
import {UploadService} from '../../../../@shared/components/uploader/upload.service';
import {AddressService} from '../address.service';

@Component({
  selector: 'app-admin-address-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class AdminAddressItemPage extends AppItemBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  orderKeys = [
    'address',
    'phone',
    'fax',
  ];
  menu = this.route.snapshot.queryParams.menu;

  constructor(injector: Injector,
              private uploadSvc: UploadService,
              private addressSvc: AddressService) {
    super(injector);
    this.init('address', this.orderKeys);
  }

  filterCustomType(): void {
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    this.submit(this.addressSvc);
  }
}
