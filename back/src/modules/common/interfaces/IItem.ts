interface IAuthor{
    name: string;
    lastname: string;
}
interface IPrice {
    currency: string;
    amount: number;
    decimals?: number;
}
interface IProduct {
    id: string;
    title: string;
    price: IPrice;
    picture: string;
    condition: string;
    free_shipping: boolean
    sold_quantity?: number;
    description?: string;
    address: string;
}
export default interface IItem {
    author: IAuthor;
    categories?: string[];
    items: IProduct[];
}
