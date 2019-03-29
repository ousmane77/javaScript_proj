import { Injectable } from '@angular/core';
import { Produit } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private produits: Produit[] = [
    {
      id: '1',
      title: 'Burger',
      price: 3,
      category: 'Burger',
      city: 'Burger King',
      averageStar: 4,
      availability:
      {
        available: true,
        type: 'Livraison',
        feed: 1
      },
      pictures: [
        'assets/images/produit1/image1.png',
        'assets/images/produit1/image2.jpg'
      ]
  
    },
    {
      id: '2',
      title: 'Poulet',
      price: 5,
      category: 'Poulet',
     
      city: 'Kfc',
      averageStar: 5,
      availability:
      {
        available: true,
        type: 'Pas de livraison',
      },
      pictures: [
        'assets/images/produit2/image1.jpg',
        'assets/images/produit2/image2.jpg'
      ]
  
    },
    {
      id: '3',
      title: 'Pizza',
      price: 9,
      category: 'Pizza',
      city: 'La Shish',
      averageStar: 4,
      availability:
      {
        available: true,
        type: 'Livraison',
        feed: 1
      },
      pictures: [
        'assets/images/produit3/image1.jpg',
        'assets/images/produit3/image2.jpg'
      ]
  
    },{
      id: '4',
      title: 'Sandwich',
      price: 6,
      category: 'Sandwich',
      city: 'American Sandwich',
      averageStar: 3,
      availability:
      {
        available: true,
        type: 'Pas de livraison',
       },
      pictures: [
        'assets/images/produit4/image1.jpg',
        'assets/images/produit4/image2.jpg'
      ]
  
    }
  ];
  constructor() { }

  getAllProduit()
  {
      return [...this.produits]
  }
  getProduit( produitId: string){
      return {
        ...this.produits.find(produit => {
          return produit.id === produitId;
      })};
  }
}
