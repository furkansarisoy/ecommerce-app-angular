import { OrderState } from "../../models/order";

export const UPDATE_ORDER_STATE_OPTIONS = [
    {
        key: 'Sipariş Alındı',
        value: OrderState.Ordered
    },
    {
        key: 'Hazırlanıyor',
        value: OrderState.Preparing
    },
    {
        key: 'Kargoya Verildi',
        value: OrderState.Shipment
    },
    {
        key: 'Teslim Edildi',
        value: OrderState.Delivered
    },
    {
        key: 'İptal Edildi',
        value: OrderState.Cancelled
    },
];

export const ORDER_STATE_FILTER_OPTIONS = [
    {
        text: 'Sipariş Alındı',
        value: OrderState.Ordered
    },
    {
        text: 'Hazırlanıyor',
        value: OrderState.Preparing
    },
    {
        text: 'Kargoya Verildi',
        value: OrderState.Shipment
    },
    {
        text: 'Teslim Edildi',
        value: OrderState.Delivered
    },
    {
        text: 'İptal Edildi',
        value: OrderState.Cancelled
    }
];