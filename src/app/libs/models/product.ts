export interface Product {
    id?: string;
    title: string;
    description: string;
    colors: string[];
    sizes: string[];
    stock: number;
    previewImageUrls: string[];
    price: number;
    tags: string[];
    category: string;
    state: ProductState;
}

export enum ProductState {
    Active = 'active',
    Deactive = 'deactive',
    OutOfStock = 'outofstock'
}
