import {Component, HostBinding, Injector} from '@angular/core';

import {ToastController} from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';

import {AppListBaseComponent} from '../../../../@shared/components/base/base.component';
import {ContentTypeService} from '../../../../@core/services/contentType.service';

@Component({
  selector: 'app-admin-content-type-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class AdminContentTypeListPage extends AppListBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  items;
  displayedColumns: string[] = ['select', 'id', 'name', 'actions'];
  menu = this.route.snapshot.queryParams.menu;

  constructor(private injector: Injector,
              public contentTypeSvc: ContentTypeService,
              public toastController: ToastController) {
    super(injector);
    this.getData();
  }

  getData(): void {
    const body: any = {};
    if (this.menu) {
      body['menu.id'] = this.menu;
    }
    this.contentTypeSvc.find(body).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  addArticle(): void {
    this.router.navigate(['/admin/contentType/item', 0], {queryParamsHandling: 'merge'}).then();
  }

  handleToEdit(row): void {
    this.router.navigate(['/admin/contentType/item', row.id], {queryParamsHandling: 'merge'}).then();
  }

  handleToDel(row): void {
    this.dialogSvc.show({
      content: this.translate('dialog_msg'),
      confirm: this.translate('confirm'),
      cancel: this.translate('cancel')
    }).subscribe(info => {
      if (info.value) {
        this.contentTypeSvc.delete(row.id).subscribe();
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
