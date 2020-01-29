import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebaseauth/auth.service';
import { FirebaseCollectionName } from 'src/app/constants/collection.constant';
import { AppSettingService } from 'src/app/services/appSetting/app-setting.service';

// class customerSettingModel {
//   id :number;
//   rtinSec :string;
//   rinKM :string;
//   mcafbooking :string;
// }
@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.css']
})
export class AppSettingComponent implements OnInit {
  customerSetting:any; 
  driverSetting:any;
  constructor(  public auth: AuthService, private crudService: AppSettingService ) { }

  ngOnInit() { 
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-purple sidebar-mini';

    // this.crudService.readCustomerAppSetting().subscribe(docData => {
    //   console.log('readAppSettingCustomer()', docData.data());
    //     this.customerSetting = docData.data();
    // });

    // this.crudService.readDriverAppSetting().subscribe(docData => {
    //   console.log('readAppSettingDriver()', docData.data());
    //    this.driverSetting = docData.data();
    //    });
   
  }

  UpdateDriverAppSetting(data){
    console.log('UpdateDriverAppSetting',data);
    // let record={};
    // record['responseSendWaitingTimeInSec']=data.responseSendWaitingTimeInSec;
   // this.crudService.updateDriverAppSetting(data);
  }
  UpdateCustomerAppSetting(data){
    console.log('UpdateCustomerAppSetting',data);
    
   // this.crudService.updateCustomerAppSetting(data);
  }

}
