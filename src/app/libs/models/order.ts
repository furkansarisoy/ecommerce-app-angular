import { Address } from "./address";
import { Product } from "./product";

export interface Order {
    id?: string;
    date?: Date;
    uid: string;
    address: Address;
    state: OrderState;
    orderedProducts: OrderedProduct[];
    totalCost: number;
    shipmentCost: number;
}

export interface OrderedProduct {
    product: Product;
    count: number;
    size: string;
    color: string;
}

export enum OrderState {
    Delivered = 'delivered',
    Shipment = 'shipment',
    Preparing = 'preparing',
    Cancelled = 'cancelled',
    Ordered = 'ordered'
}
