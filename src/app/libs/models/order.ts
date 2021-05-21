import { Address } from "./address";
import { Person } from "./person";
import { Product } from "./product";

export interface Order {
    user: Person;
    address: Address;
    state: OrderState;
    orderedProducts: OrderedProduct[];
    totalCost: number;
    shipmentCost: number;
}

export interface OrderedProduct {
    product: Product;
    count: number;
}

export enum OrderState {
    Delivered = 'delivered',
    Shipment = 'shipment',
    Preparing = 'preparing',
    Cancelled = 'cancelled'
}
