import {describe, expect} from '@jest/globals';
import {CartItem} from "../../../../src/components/types/cartItem";
import {CartItemArg} from "../../../../src/components/types/cartItemArg";
import {Product} from "../../../../src/components/types/product";
import {Slice} from "@reduxjs/toolkit";

describe('cart slice', () => {
    it('should load initial state from localStorage', () => {
        const initialState = [{
            id: 1,
            product: {
                id: 48,
                name: "Christmas bauble with deco",
                price: 2.99,
                stock: 5,
                collection: 2023,
                color: "blue",
                size: 8,
                favorite: false,
                category: "Tree decorations",
                images: [
                    "/assets/img/products/unique-glass-christmas-bauble-with-deco-8-cm-iceblue.jpg",
                    "/assets/img/products/unique-glass-christmas-bauble-with-deco-8-cm-iceblue(1).jpg"
                ]
            },
            quantity: 3
        }]

        localStorage.setItem('store', JSON.stringify({cart: initialState}))
        const cartSlice = require('../../../../src/components/store/reducers/cart');
        expect(cartSlice.getInitialState()).toEqual(initialState)
    })

    describe('reducers', () => {
        let initialState: CartItem[]
        let product: Product
        let cartSlice: Slice<CartItem[]>

        beforeEach(() => {
            initialState = []
            cartSlice = require('../../../../src/components/store/reducers/cart');
            product = {
                id: 48,
                name: "Christmas bauble with deco",
                price: 2.99,
                stock: 5,
                collection: 2023,
                color: "blue",
                size: 8,
                favorite: false,
                category: "Tree decorations",
                images: [
                    "/assets/img/products/unique-glass-christmas-bauble-with-deco-8-cm-iceblue.jpg",
                    "/assets/img/products/unique-glass-christmas-bauble-with-deco-8-cm-iceblue(1).jpg"
                ]
            }
        })

        describe('addProductToCart', () => {
            it('should add new product', () => {
                const item: CartItemArg = {
                    product: product,
                    quantity: 42
                }

                const expected: CartItem[] = [{id: 1, ...item}]
                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.addProductToCart(item)))
                exp.toEqual(expected)
            })

            it('should increase product amount', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 1
                }]

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.addProductToCart({
                    product,
                    quantity: 2
                })))
                const expected: CartItem[] = [{id: 1, product, quantity: 3}]
                exp.toEqual(expected)
            })

            it('should not increase product amount more than stock', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 3
                }]

                const expected: CartItem[] = [{id: 1, product, quantity: 5}]
                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.addProductToCart({
                    product,
                    quantity: 43
                })))
                exp.toEqual(expected)
            })
        })

        describe('setProductQuantityInCart', () => {
            it('should set quantity of a new product into state', () => {
                const item: CartItemArg = {
                    product: product,
                    quantity: 42
                }

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.setProductQuantityInCart(item)))

                const expected: CartItem[] = [{id: 1, ...item}]
                exp.toEqual(expected)
            })

            it('should set quantity of product in state', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 42,
                }]

                const item: CartItemArg = {
                    product: product,
                    quantity: 5,
                }

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.setProductQuantityInCart(item)))

                const expected: CartItem[] = [{id: 1, ...item}]
                exp.toEqual(expected)
            })
        })

        describe('removeProductFromCart', () => {
            it('should return the initial state without modifications', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 42,
                }]

                const otherProduct: Product = {
                    category: "",
                    collection: 0,
                    color: "",
                    favorite: false,
                    id: 0,
                    images: [],
                    name: "",
                    price: 0,
                    size: 0,
                    stock: 0
                }

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.removeProductFromCart(otherProduct)))
                exp.toEqual(initialState)
            })

            it('should decrease the quantity of the product in state', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 42,
                }]

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.removeProductFromCart(product)))

                const expected: CartItem[] = [{id: 1, quantity: 41, product}]
                exp.toEqual(expected)
            })

            it('should remove product from state if quantity of the product equals 1 or less than 1', () => {
                [-1, 0, 1].forEach((quantity) => {
                    initialState = [{
                        id: 1,
                        product: product,
                        quantity: quantity,
                    }]

                    const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.removeProductFromCart(product)))
                    exp.toEqual([])
                })
            })
        })

        describe('removeProductFromCartAll', () => {
            it('should return the initial state without modifications', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 42,
                }]

                const otherProduct: Product = {
                    category: "",
                    collection: 0,
                    color: "",
                    favorite: false,
                    id: 0,
                    images: [],
                    name: "",
                    price: 0,
                    size: 0,
                    stock: 0
                }

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.removeProductFromCartAll(otherProduct)))
                exp.toEqual(initialState)
            })

            it('should remove the quantity of the product in state', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 42,
                }]

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.removeProductFromCartAll(product)))
                exp.toEqual([])
            })
        })

        describe('clearCart', () => {
            it('should return the initial state without modifications', () => {
                initialState = [{
                    id: 1,
                    product: product,
                    quantity: 42,
                }]

                const exp = expect(cartSlice.reducer(initialState, cartSlice.actions.clearCart(null)))
                exp.toEqual([])
            })
        })
    })
})

