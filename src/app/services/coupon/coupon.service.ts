import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private firestore: AngularFirestore) { }

  create_NewStudent(record) {
    return this.firestore.collection('complaints').add(record);
  }
 
  read_Students() {
    return this.firestore.collection('complaints').snapshotChanges();
  }
 
  update_Student(recordID,record){
    this.firestore.doc('complaints/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('complaints/' + record_id).delete();
  }
}