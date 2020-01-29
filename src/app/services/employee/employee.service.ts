
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollectionName } from 'src/app/constants/collection.constant';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }

  
 
  ReadEmployee() {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_EMPLOYEE).snapshotChanges();  
  }
  SaveEmployee(record) {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_EMPLOYEE).add(record);  
  }
  UpdateEmployee(recordID,record){
    this.firestore.doc(FirebaseCollectionName.COLLECTION_EMPLOYEE+'/' + recordID).update(record);
  }
  UpdateBlockedDriverData(recordID,record){
    this.firestore.doc(FirebaseCollectionName.COLLECTION_EMPLOYEE+'/' + recordID).update(record);
  }
  UpdateBlockedUserData(collection,recordID,record){
    this.firestore.doc(collection+'/' + recordID).update(record);
  }
  delete_Student(record_id) {
    this.firestore.doc('complaints/' + record_id).delete();
  }
}



 

