export interface Produit
{
    id: string;
    title: string;
    pictures: string[];
    price: number;
    category: string;
    availability: Availability;
    city: string;
    averageStar: number;
}
export interface Availability
{
    available: boolean;
    type: string;
    feed?: number;
}