import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollectionName } from 'src/app/constants/collection.constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firestore: AngularFirestore) { }

  create_NewStudent(record) {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_CUSTOMERS).add(record);
  }
 
  customerCountForDashboard() {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_CUSTOMERS).get();
  }
 
  driverCountForDashboard() {
    return this.firestore.collection("ijnkj").get();
  }
  updateCustomerDetails(recordID,record){
    this.firestore.doc(FirebaseCollectionName.COLLECTION_CUSTOMERS+'/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc(FirebaseCollectionName.COLLECTION_CUSTOMERS+'/' + record_id).delete();
  }
  
}