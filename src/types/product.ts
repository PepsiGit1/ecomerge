export interface IProduct {
    name: string;
    description?: string;
    price: number;
    image?: string;
    embedding: number[];
    categoryId?: string;
    brand: string;

}
export interface ICategory {
    name: string;
    image: string
}