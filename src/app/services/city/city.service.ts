import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollectionName } from 'src/app/constants/collection.constant';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private firestore: AngularFirestore) { }

  create_NewStudent(record) {
    return this.firestore.collection('complaints').add(record);
  }
 
  readCities() {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_CITIES).snapshotChanges();  
  }
  readDriverAppSetting() {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_CITIES).snapshotChanges();  
  }
}
