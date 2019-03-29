import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {ToastController, ModalController} from '@ionic/angular';

import { Produit } from '../home/home.model';
import { Cart } from '../home/cart.model';
import { ToastOptions } from '@ionic/core';
import { CartPage } from '../cart/cart.page';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  ProduitDetail : Produit;
  nom: string;
  constructor(private param:ActivatedRoute,private http: HttpClient, public toast: ToastController,
     private homeService: HomeService, public storage: Storage, public modal: ModalController) { }
  resto = [];
  ngOnInit() { 
     this.get(this.param.snapshot.paramMap.get('id'))
    console.log(this.param.snapshot.paramMap.get('id'))
  }
  get(id) 
  {
    this.http.get('http://localhost:3000/resto/'+id).subscribe((response) => {
      this.resto = response['result'];
      console.log(this.resto)
    })
    
  }
  addToCart(produitDetail: Produit): void
  {
    let ajou: boolean = false;
    this.storage.get('Cart').then((data: Cart[])=>{
      if(data === null || data.length === 0){
        data = [];
        data.push({
          item:produitDetail,
          qte: 1,
          total: produitDetail.price
        })
      }else{
        for(let i = 0; i<data.length; i++){
          const element: Cart = data[i];
          if(produitDetail.id === element.item.id){
             element.qte +=1;
             element.total += produitDetail.price
             ajou = true;
          }
        }
        if(!ajou)
        {
          data.push({
            item: produitDetail,
            qte: 1,
            total: produitDetail.price
          })
        }
      }
      this.storage.set('Cart', data)
      .then(async data => {
        let options = await this.toast.create({
          message: 'Votre panier a été mis à jour',
          duration: 5000,
          showCloseButton: true,
          closeButtonText: 'Fermer'
        });
          options.present();
      })
      .catch(err =>{
        console.log('Erreur', err)
      });

    })
  }
  async openCart(){
    const mod = await this.modal.create({
      component: CartPage,
      componentProps: {value: 123}
    })
    return await mod.present();
      
    
    
  }
}


