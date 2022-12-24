import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadState} from "./storeDb";
import {PromocodeDataType} from "../../types/promocodeDataType";
import {PromocodeType} from "../../types/promocodeType";

/**
 * начальное состояние стейта
 */
let initialState = loadState<PromocodeDataType>('promocode', {
    applied: [],
    available: [
        {
            id: 1,
            name: "NEW-YEAR-2023",
            discount: 7
        },
        {
            id: 2,
            name: "JOLLY-XMAS",
            discount: 10
        }
    ],
});

export const slice = createSlice({
    name: 'promocode',
    initialState,
    reducers: {
        /**
         * добавляет продукт в стейт корзины, при повторном добавлении увеличивает quantity
         */
        addAvailablePromocode: (state, {payload: promocode}: PayloadAction<PromocodeType>): PromocodeDataType => {
            state.available.push(promocode)
            return state;
        },

        addAppliedPromocode: (state, {payload: id}: PayloadAction<number>): PromocodeDataType => {
            const promocode = state.available.find(el => el.id === id)
            if (promocode) {
                state.applied.push(promocode)
            }
            return state;
        },

        removeAppliedPromocode: (state, {payload: id}: PayloadAction<number>): PromocodeDataType => {
            state.applied = state.applied.filter(el => el.id !== id)
            return state;
        },
    },
});

/**
 * экспортируем экшены из слайса, чтобы использовать их в контроллере
 */
export const {addAvailablePromocode, addAppliedPromocode} = slice.actions;

/**
 * экспортируем редюсер из слайса, чтобы использовать его для инициализации store
 */
export default slice.reducer;
