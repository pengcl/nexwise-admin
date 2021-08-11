import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPage} from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.AdminDashboardPageModule)
      },
      {
        path: 'menu/list',
        loadChildren: () =>
          import('./menu/list/list.module').then(m => m.AdminMenuListPageModule)
      },
      {
        path: 'menu/item/:id',
        loadChildren: () =>
          import('./menu/item/item.module').then(m => m.AdminMenuItemPageModule)
      },
      {
        path: 'article/list',
        loadChildren: () =>
          import('./article/list/list.module').then(m => m.AdminArticleListPageModule)
      },
      {
        path: 'article/item/:id',
        loadChildren: () =>
          import('./article/item/item.module').then(m => m.AdminArticleItemPageModule)
      },
      {
        path: 'address/list',
        loadChildren: () =>
          import('./address/list/list.module').then(m => m.AdminAddressListPageModule)
      },
      {
        path: 'address/item/:id',
        loadChildren: () =>
          import('./address/item/item.module').then(m => m.AdminAddressItemPageModule)
      },
      {
        path: 'contentType/list',
        loadChildren: () =>
          import('./content-type/list/list.module').then(m => m.AdminContentTypeListPageModule)
      },
      {
        path: 'contentType/item/:id',
        loadChildren: () =>
          import('./content-type/item/item.module').then(m => m.AdminContentTypeItemPageModule)
      },
      {
        path: 'file/list',
        loadChildren: () =>
          import('./file/list/list.module').then(m => m.AdminFileListPageModule)
      },
      {
        path: 'file/item/:id',
        loadChildren: () =>
          import('./file/item/item.module').then(m => m.AdminFileItemPageModule)
      },
      {
        path: 'soft/list',
        loadChildren: () =>
          import('./soft/list/list.module').then(m => m.AdminSoftListPageModule)
      },
      {
        path: 'soft/item/:id',
        loadChildren: () =>
          import('./soft/item/item.module').then(m => m.AdminSoftItemPageModule)
      },
      {
        path: 'asset/list',
        loadChildren: () =>
          import('./asset/list/list.module').then(m => m.AdminAssetListPageModule)
      },
      {
        path: 'asset/item/:id',
        loadChildren: () =>
          import('./asset/item/item.module').then(m => m.AdminAssetItemPageModule)
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then(m => m.AdminSettingPageModule)
      },
      {
        path: 'user/list',
        loadChildren: () =>
          import('./user/list/list.module').then(m => m.AdminUserListPageModule)
      },
      {
        path: 'user/item/:id',
        loadChildren: () =>
          import('./user/item/item.module').then(m => m.AdminUserItemPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
