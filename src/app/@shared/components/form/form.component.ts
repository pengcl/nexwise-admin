import {Component, Input, Output, EventEmitter, AfterContentInit, Inject} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LanguageService} from '../../../@core/modules/languiage/language.service';
import {SettingService} from '../../../pages/admin/setting/setting.service';
import {UploadResult} from 'ngx-markdown-editor';
import {FormGroup} from '@angular/forms';
import {Uploader, UploaderOptions} from '../uploader';
import {AuthService} from '../../../pages/auth/auth.service';
import {CustomTypeComponent} from '../customType/customType.component';
import {UploadService} from '../uploader/upload.service';
import {formData} from '../../../@core/utils/extend';
import {forkJoin} from 'rxjs';
import {isArray} from 'lodash-es';
// const URL = '/api/';
const URL = '/upload/';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterContentInit {
  @Input() form = new FormGroup({});
  @Input() keys;
  @Input() selector;
  @Input() values;
  @Output() formChange = new EventEmitter();
  menuId;
  floatLabelType = 'always';
  setting = this.settingSvc.currentSettings;
  lan = this.setting.language.code;
  url = this.PREFIX_URL + '/api/upload';
  uploader: Uploader = new Uploader({
    method: 'POST',
    alias: 'files',
    url: this.PREFIX_URL + '/upload',
    withCredentials: false,
    headers: [
      {
        name: 'Authorization', value: 'Bearer ' + this.authSvc.token().jwt,
      }],
    params: {
      fileInfo: JSON.stringify({alternativeText: '', caption: '', name: null})
    },
    auto: true,
    onUploadSuccess(): void {
      console.log('onUploadSuccess', arguments);
    }
  } as UploaderOptions);

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private modalController: ModalController,
              private uploadSvc: UploadService,
              private authSvc: AuthService,
              private languageSvc: LanguageService,
              private settingSvc: SettingService) {
    this.doUpload = this.doUpload.bind(this);
  }

  uploadSuccess(item, e): void {
    if (item.attributes.multiple) {
      const ids = [];
      e.forEach(file => {
        ids.push(file.id);
      });
      this.form.get(item.key).setValue(ids);
    } else {
      this.form.get(item.key).setValue(e[0].id);
    }
  }

  deleteSuccess(item, e): void {
    let value;
    if (item.attributes.multiple) {
      value = [];
      e.forEach(file => {
        value.push(file.id);
      });
    } else {
      value = '';
      e.forEach(file => {
        value = file.id;
      });
    }
    this.form.get(item.key).setValue(value);
  }

  ngAfterContentInit(): void {
    this.form.valueChanges.subscribe(res => {
      if (this.form.controls.menu) {
        if (this.form.get('menu').value) {
          this.menuId = Number(this.form.get('menu').value);
        }
        this.formChange.next(this.form);
      }
    });
  }

  translate(key: string, ...args: any[]): string {
    return this.languageSvc.translate(key);
  }

  async presentCustomTypeModal(): Promise<any> {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: CustomTypeComponent,
      componentProps: {menu: this.menuId}
    });
    await modal.present();
    const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
    if (data) {
      window.location.reload();
    }
  }

  addCustomType(): void {
    this.presentCustomTypeModal().then();
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    return new Promise((resolve, reject) => {
      const result: Array<UploadResult> = [];
      const posts = [];
      for (const file of files) {
        const body = formData({files: file});
        posts.push(this.uploadSvc.upload(body));
      }
      forkJoin(posts).subscribe(results => {
        results.forEach((res: any) => {
          result.push({
            name: res[0].name,
            url: this.PREFIX_URL + res[0].url,
            isImg: true
          });
        });
        resolve(result);
      });
    });
  }
}
