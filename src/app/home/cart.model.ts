import { Produit } from './home.model';
export interface Cart{
    item: Produit;
    qte: number;
    total: number;

}