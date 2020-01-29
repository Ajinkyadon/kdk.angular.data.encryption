import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollectionName } from 'src/app/constants/collection.constant';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(private firestore: AngularFirestore) { }

  CreateComplaint(record) {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_COMPLAINTS).add(record);
  }
  SetComplaintHistory(ComplaintDocID, Historyrecord){
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_COMPLAINTS)
                        .doc(ComplaintDocID)
                        .collection(FirebaseCollectionName.COLLECTION_COMPLAINT_HISTORY).add(Historyrecord);
  }
 
  ReadComplaints() {
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_COMPLAINTS).snapshotChanges();
  }
  
  viewComplaintHistory(ComplaintDocID){
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_COMPLAINTS)
                        .doc(ComplaintDocID)
                        .collection(FirebaseCollectionName.COLLECTION_COMPLAINT_HISTORY).snapshotChanges();
  }
  UpdateComplaint(recordID,record){
    return this.firestore.collection(FirebaseCollectionName.COLLECTION_COMPLAINTS).doc(recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('complaints/' + record_id).delete();
  }
}



 

