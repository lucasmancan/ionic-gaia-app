import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private productsCollection: AngularFirestoreCollection<any>;
 
  private products: Observable<any[]>;
 
  constructor(db: AngularFirestore) {
    this.productsCollection = db.collection<any>('products');
 
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getProduct() {
    return this.products;
  }
 
  get(id) {
    return this.productsCollection.doc<any>(id).valueChanges();
  }
 
  updateProduct(any: any, id: string) {
    return this.productsCollection.doc(id).update(any);
  }
 
  add(any: any) {
    return this.productsCollection.add(any);
  }
 
  remove(id) {
    return this.productsCollection.doc(id).delete();
  }
}