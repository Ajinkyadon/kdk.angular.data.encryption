import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {LayoutModule} from '../layout/layout.module';
import { AuthService } from '../firebaseauth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule  } from 'ng2-completer';
import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from './smart-table-datepicker/smart-table-datepicker.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { AppSettingComponent } from './app-setting/app-setting.component';
import { CityComponent } from './city/city.component';
import { EncryptDecryptService } from 'src/app/services/encryptdecrypt/encrypt-decrypt.service';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  declarations: [
    DashboardComponent,  
    PagenotfoundComponent,
    EmployeeComponent,
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
    ComplaintComponent,
    AppSettingComponent,
    CityComponent,
    CustomerComponent,
    
    
  ],
  imports: [
    Ng2SmartTableModule,
    Ng2CompleterModule ,
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule, 
   
  ],
  exports:[
    ReactiveFormsModule,
   
  ],
  entryComponents: [
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
 
  ],
  providers:[AuthService, EncryptDecryptService]
  
})
export class HomeModule { }




