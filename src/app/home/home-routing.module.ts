import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../firebaseauth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EmployeeComponent } from './employee/employee.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { AppSettingComponent } from './app-setting/app-setting.component';
import { CityComponent } from './city/city.component';
import { CustomerComponent } from './customer/customer.component';


const routes: Routes = [
  {  
    // path: 'dashboard', 
    // component: DashboardComponent, 
    // canActivate: [AuthGuard] 
   
      path: 'dashboard',
      component: DashboardComponent,
      //  canActivate: [AuthGuard]
   
  },
  
  {  
    path: 'employee', 
    component: EmployeeComponent, 
    // canActivate: [AuthGuard] 
  },
  {  
    path: 'complaint', 
    component: ComplaintComponent, 
    // canActivate: [AuthGuard] 
  },
  {  
    path: 'appSetting', 
    component: AppSettingComponent, 
    // canActivate: [AuthGuard] 
  },
  {  
    path: 'customer', 
    component: CustomerComponent, 
    // canActivate: [AuthGuard] 
  },
  {  
    path: 'city', 
    component: CityComponent, 
    // canActivate: [AuthGuard] 
  },
  {
    path: '**',    
    component: PagenotfoundComponent, 
    // canActivate: [AuthGuard]  
  }

 ];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class HomeRoutingModule { }

