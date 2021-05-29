import { Address } from "./address";
import { Card } from "./card";
import { Order } from "./order";
import { Product } from "./product";

export interface Person {
    uid: string;
    isAdmin: boolean;
    name: string;
    surname: string;
    gender?: string;
    mail: string;
    profileImage?: string;
    addresses?: Address[];
    cards?: Card[];
    orders?: Order[];
    favorites?: Product[];
    personalizedTags?: string[];
    cart?: Product[];
}
