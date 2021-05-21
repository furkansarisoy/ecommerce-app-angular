import { Address } from "./address";
import { Person } from "./person";
import { Product } from "./product";

export interface Order {
    user: Person;
    address: Address;
    state: OrderState;
    products: Product[];
    totalCost: number;
    shipmentCost: number;
}

export enum OrderState {
    Delivered = 'delivered',
    Shipment = 'shipment',
    Preparing = 'preparing',
    Cancelled = 'cancelled'
}
