import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/firebaseauth/auth.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor( public auth: AuthService, private crudService: DashboardService) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-purple sidebar-mini';


    this.crudService.customerCountForDashboard().subscribe(data => {
      this.customersCount = data.size;
      console.log("customer count--->",this.customersCount);
    });

    this.crudService.driverCountForDashboard().subscribe(data => {
      this.driversCount = data.size;
      console.log("Driver count--->",this.driversCount);
    });

  }

    ngOnDestroy(): void {
        document.body.className = '';
    }
    customersCount:any;
    driversCount:any;
    customerCountForDashboardTS(){

    }


}

