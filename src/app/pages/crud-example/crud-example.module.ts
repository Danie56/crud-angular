import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './containers/forms/forms.component';
import { ListComponent } from './containers/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


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
    FormsModule,
    MatFormFieldModule,
     MatInputModule, 
     
     MatDatepickerModule, 
     MatNativeDateModule
  ],
})
export class CrudExampleModule {}
