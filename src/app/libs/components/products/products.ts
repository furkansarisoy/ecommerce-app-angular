import { Gender, ProductState } from '../../models/product';


export const PRODUCT_STATE_FILTER_OPTIONS = [
    {
        text: 'Aktif',
        value: ProductState.Active
    },
    {
        text: 'İnaktif',
        value: ProductState.Deactive
    },
    {
        text: 'Stokta Yok',
        value: ProductState.OutOfStock
    }
];

export const GENDER_FILTER_OPTIONS = [
    {
        text: 'Kadın',
        value: Gender.Female
    },
    {
        text: 'Erkek',
        value: Gender.Male
    }
];