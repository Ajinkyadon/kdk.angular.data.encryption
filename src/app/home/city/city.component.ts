import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city/city.service';
import { AuthService } from 'src/app/firebaseauth/auth.service';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';

  

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities:any;
  constructor( public auth: AuthService, private crudService: CityService ) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-purple sidebar-mini';

    this.crudService.readCities().subscribe(data => {
 
      this.cities = data.map(e => {
        return { 
          id: e.payload.doc.id,
          city: e.payload.doc.data()['city'],
          NE: e.payload.doc.data()['NE'].geopoint.latitude.toString(),
          SW: e.payload.doc.data()['SW'],
        };
      })
      console.log('readCities latutude',this.cities.NE);
      console.log('readCities',this.cities);
    });
  }

}
