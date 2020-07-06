import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private dbname: string;

  constructor(public fireservices: AngularFirestore) {
    this.dbname = 'users';
  }

  // tslint:disable-next-line:typedef
  get_allusers() {
    return this.fireservices.collection(this.dbname).snapshotChanges();
  }

  // tslint:disable-next-line:typedef
  create_newuser(user) {
    return this.fireservices.collection(this.dbname).add(user);
  }

  update_user(id, user): void {
    this.fireservices.doc(this.dbname + '/' + id).update(user);
  }

  delete_user(id: string): void {
    this.fireservices.doc(this.dbname + '/' + id).delete();
  }
}
