import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollectionName } from 'src/app/constants/collection.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: AngularFirestore) { }

  
 
  ReadCustomer() {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_CUSTOMER).snapshotChanges();  
  }
  SaveCustomer(record) {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_CUSTOMER).add(record);  
  }
  UpdateCustomer(recordID,record){
    this.firestore.doc(FirebaseCollectionName.COLLECTION_CUSTOMER+'/' + recordID).update(record);
  }

}


