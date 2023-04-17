import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebService } from './services/web.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesService } from './services/employees/employees.service';
import { WorkdaysService } from './services/workdays/workdays.service';

@NgModule({
  declarations: [ ],
  imports: [ CommonModule, HttpClientModule ],
  exports: [ ],
  providers: [ WebService, EmployeesService, WorkdaysService ],
})
export class GlobalModule {}
