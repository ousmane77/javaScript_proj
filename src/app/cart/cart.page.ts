import { Component, OnInit } from '@angular/core';
import { ViewController, AlertOptions } from '@ionic/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Cart } from '../home/cart.model';
import { Storage } from '@ionic/storage';
import { Produit } from '../home/home.model';

 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
cart : Cart[];
total:number = 0  ;
  constructor(public alertCtrl: AlertController, public modal:  ModalController, public storage: Storage, public toast: ToastController) { }

  ngOnInit() {
    this.storage.get('Cart')
      .then((data : Cart[]) =>{
        this.cart = data;
        this.cart.forEach((element: Cart)=>{
          if(element.item.availability.type === 'Pas de livraison'){
            element.item.availability.feed = 0;
          }
          this.total += (element.item.availability.feed + element.item.price * element.qte)
        }  )
        console.log(this.cart)
      })
      .catch(err =>{
        console.log('Erreur', err)
      })
  }
  async closeModal(){
    this.modal.dismiss();
  }
  remove( p : Cart, index: number)
  {
    let opt:  AlertOptions = {
      header: 'Attention',
      subHeader: 'Etes-vous sur de vouloir retirer ${p.title}',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Retirer',
          handler: ()=>{
            let price: number = p.item.price;
            let qte: number = p.qte;
            let feed: number = p.item.availability.feed;
            let mytotal:number = feed+price*qte;
           

          }
        }
      ]

    }    
      this.cart.splice(index, 1)
      this.storage.set('Cart', this.cart)
      .then(async data => {
        let options = await this.toast.create({
          message: 'Votre article a été retiré',
          duration: 2000,
        });
          options.present();
      })
      .catch(err =>{
      console.log('Erreur', err)
  });
  }
}
