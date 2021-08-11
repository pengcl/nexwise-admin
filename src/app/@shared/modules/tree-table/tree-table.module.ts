import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TreeTableComponent} from './component/tree-table.component';

export {Node, Options} from './models';

@NgModule({
  declarations: [
    TreeTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    TreeTableComponent
  ]
})
export class TreeTableModule {
}
