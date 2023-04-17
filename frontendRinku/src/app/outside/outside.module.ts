import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OutsideRoutingModule } from './outside-routing.module';
import { OutsideComponent } from './outside.component';
import { MatInputModule } from '@angular/material/input'
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ LoginComponent, OutsideComponent ],
  imports: [ CommonModule, OutsideRoutingModule, FormsModule, MatInputModule, ReactiveFormsModule ],
  exports: [ ],
  providers: [ CookieService ],
})
export class OutsideModule {}
