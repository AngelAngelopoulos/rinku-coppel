import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsideRoutingModule } from './inside-router.module';
import { InsideComponent } from './inside.component';
import { GlobalModule } from '../global/global.module';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeesComponent } from './employees/employees.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeModalComponent } from './employees/modals/employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WorkdayModalComponent } from './employees/modals/workday/workday.component';
import { NewWorkdayModalComponent } from './employees/modals/workday/new/new.component';
import {MatSelectModule} from '@angular/material/select';
import { DeleteEmployeeModalComponent } from './employees/modals/employee/delete/delete.component';

@NgModule({
  declarations: [
    InsideComponent,
    EmployeesComponent,
    ToolbarComponent,
    EmployeeModalComponent,
    WorkdayModalComponent,
    NewWorkdayModalComponent,
    DeleteEmployeeModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    InsideRoutingModule,
    GlobalModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule
  ],
  exports: [],
  providers: [],
})
export class InsideModule {}
