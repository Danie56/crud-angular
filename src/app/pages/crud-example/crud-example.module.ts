import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './containers/forms/forms.component';
import { ListComponent } from './containers/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'forms',
    component: FormsComponent,
  },
  {
    path: 'forms/:id',
    component: FormsComponent,
  },
];

@NgModule({
  declarations: [FormsComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    FormsModule
  ],
})
export class CrudExampleModule {}
