import {Component, HostBinding, Injector} from '@angular/core';
import {AddressService} from '../address.service';
import {ToastController} from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';

import {AppListBaseComponent} from '../../../../@shared/components/base/base.component';

@Component({
  selector: 'app-admin-address-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminAddressListPage extends AppListBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  items;
  displayedColumns: string[] = ['select', 'id', 'address', 'actions'];
  menu = this.route.snapshot.queryParams.menu;

  constructor(private injector: Injector,
              private addressSvc: AddressService,
              public toastController: ToastController) {
    super(injector);
    this.getData();
  }

  getData(): void {
    const body: any = {};
    if (this.menu) {
      body['menu.id'] = this.menu;
    }
    this.addressSvc.find(body).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  addArticle(): void {
    this.router.navigate(['/admin/address/item', 0], {queryParamsHandling: 'merge'}).then();
  }

  handleToEdit(row): void {
    this.router.navigate(['/admin/address/item', row.id], {queryParamsHandling: 'merge'}).then();
  }

  handleToDel(row): void {
    this.dialogSvc.show({
      content: this.translate('dialog_msg'),
      confirm: this.translate('confirm'),
      cancel: this.translate('cancel')
    }).subscribe(info => {
      if (info.value) {
        this.addressSvc.delete(row.id).subscribe();
      }
    });
  }

  async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: '删除成功!',
      duration: 1000
    });
    await toast.present();
    this.getData();
  }

}
