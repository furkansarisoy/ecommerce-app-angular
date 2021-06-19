import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from 'src/app/libs/models/product';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';
import { ProductService } from 'src/app/libs/services/product.service';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
})
export class ProfileFavoritesComponent implements OnInit {

  favorites: Product[];
  activePersonId: string;


  constructor(
    private authService: AuthenticationService,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private angularFireStore: AngularFirestore,
    private nzMessageService: NzMessageService
  ) {
    this.angularFireAuth.authState.subscribe(state => {
      if (state?.uid) {
        this.activePersonId = state.uid;
        this.getPersonCredentialById(state.uid);
      }
    });
  }

  ngOnInit(): void {
  }

  getPersonCredentialById(id: string) {
    this.authService.getActivePersonCredentialsById(id).subscribe(person => {
      if (person) {
        this.favorites = person?.favorites;
      }
    });
  }

  removeFavoritedItem(event, product: Product) {
    const userRef = this.angularFireStore.collection('users').doc(this.activePersonId);
    const updatingFavorites = this.favorites.filter(fav => fav.id !== product.id);
    userRef.update({
      favorites: updatingFavorites
    }).then(() => this.nzMessageService.warning(`${product.title} favorilerinizden çıkarıldı!`));
  }

  checkPreviewImg(product: Product) {
    if (product?.previewImageUrls) {
      return product.previewImageUrls[0];
    } else {
      return null;
    }
  }

  onItemClick(id: string) {
    this.router.navigate([`/product/${id}`]);
  }

}
