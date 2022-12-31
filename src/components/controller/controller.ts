import {CallbackFn} from "../types/callbackFn";
import {Product} from "../types/product";
import store from "../store/store";
import {
    addProductToCart,
    removeProductFromCart,
    removeProductFromCartAll,
    setProductQuantityInCart
} from "../store/reducers/cart";

import products from '../../assets/data/products.json'
import {CartDataType, GetPriceByPromocodes} from "../types/cartDataType";
import {MainPageDataType} from "../types/mainPageDataType";
import {FilterCategoryType, FilterList, FiltersDataType, MinMaxType} from "../types/filtersDataType";
import {addAppliedPromocode, removeAppliedPromocode} from "../store/reducers/promocode";
import {Router} from "../router/router";
import {ProductPageType} from "../types/productPageType";

/**
 * контроллер получает, изменяет, фильтрует данные, которые потребуются для view
 * нужно доделать редакс и роутер чтобы получить все данные, сейчас мы может прокинуть только весь массив с товарами
 */
export class Controller {
    /**
     * возвращает данные для корзины / иконки в хэдере
     */
    public cart(callback: CallbackFn<CartDataType>): void {
        const cartItems = store.getState().cart
        const promocodes = store.getState().promocode;

        const price = cartItems.reduce((count, cartItem) => count + cartItem.product.price * cartItem.quantity, 0);
        const priceByPromocodes: GetPriceByPromocodes = (promocodes) => {
            const discount = promocodes?.reduce((discount, p) => discount + p.discount, 0);
            if (discount) {
                return price - discount / 100 * price
            }
            return price;
        };

        const cartData: CartDataType = {
            items: cartItems,
            priceAfterDiscount: priceByPromocodes(promocodes.applied),
            getPriceByPromocodes: priceByPromocodes,
            productCount: cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0),
            promocodes: store.getState().promocode,
        }
        callback(cartData);
    }

    public product(id: string, callback: CallbackFn<ProductPageType>) {
        const product = products.find((p) => p.id === Number(id));
        if (!product) {
            return Router.redirectTo('/404');
        }

        let cart: CartDataType|null = null;
        this.cart((cartData) => {
            cart = cartData;
        })

        callback({
            cart: cart!,
            product: product,
        })
    }

    /**
     * метод возвращает данные для страницы каталога и передает их в коллбэк
     */
    public catalog(callback: CallbackFn<MainPageDataType>) {
        const params = Router.getUrlParams()

        const getMinMax = (minMax: MinMaxType, value: number) =>  {
            minMax.min = minMax.min > value ? value : minMax.min
            minMax.max = minMax.max < value ? value : minMax.max
            return minMax;
        }

        const selectedFilters: FilterList = {
            colors: params.get('colors')?.split(','),
            collections: params.get('collections')?.split(',').map((s) => Number(s)),
            categories: params.get('categories')?.split(',').map((c => ({category: c, products: 0}))),
            price: {
                min: Number(params.get('minPrice')) || 0,
                max: Number(params.get('maxPrice')) || 0,
            },
            size: {
                min: Number(params.get('minSize')) || 0,
                max: Number(params.get('maxSize')) || 0,
            },
            stock: {
                min: Number(params.get('minStock')) || 0,
                max: Number(params.get('maxStock')) || 0,
            },
        }

        let productsList = products.filter(p => {
            if (selectedFilters.colors?.indexOf(p.color) === -1) {
                return false;
            }
            if (selectedFilters.collections?.indexOf(p.collection) === -1) {
                return false
            }
            if (selectedFilters.categories?.some((c) => c.category === p.category) == false) {
                return false
            }
            if ((selectedFilters.price?.min || 0) > p.price || (selectedFilters.price?.max || p.price) < p.price) {
                return false
            }
            if ((selectedFilters.size?.min || 0) > p.size || (selectedFilters.size?.max || p.size) < p.size) {
                return false
            }
            if ((selectedFilters.stock?.min || 0) > p.stock || (selectedFilters.stock?.max || p.stock) < p.stock) {
                return false
            }
            return true;
        });

        productsList.sort((p1, p2) => {
            const sortByValues = (params.get('sortBy') || '-').split('-')
            const sortBy = sortByValues[0] as keyof Product;
            const order = sortByValues[1] === 'desc' ? -1 : 1;

            if (p1.hasOwnProperty(sortBy) && p2.hasOwnProperty(sortBy)) {
                const p1Value = p1[sortBy];
                const p2Value = p2[sortBy];
                if (p1Value > p2Value) {
                    return order * 1;
                }
                return order * -1;
            }

            return 0;
        });

        const perPage = params.has('perPage') ? Number(params.get('perPage') || productsList.length) : 10
        productsList = productsList.slice(0, perPage)


        const filters: FiltersDataType = {
            colors: [...products.reduce((set, product) => set.add(product.color), new Set<string>())],
            collections: [...products.reduce((set, product) => set.add(product.collection), new Set<number>())].sort(),
            categories: [...products.reduce((map, product) => {
                if (map.has(product.category)) {
                    const type = map.get(product.category) as FilterCategoryType
                    type.products = type.products + 1 || 1;
                } else {
                    map.set(product.category, {category: product.category, products: 1})
                }
                return map;
            }, new Map<string, FilterCategoryType>).values()],
            price: products.reduce((minMax, product) => getMinMax(minMax, product.price), {min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER}),
            size: products.reduce((minMax, product) => getMinMax(minMax, product.size), {min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER}),
            stock: products.reduce((minMax, product) => getMinMax(minMax, product.stock), {min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER}),
            selected: selectedFilters,
        }

        let cart: CartDataType;
        this.cart((cartData) => {
            cart = cartData;
        })

        const data: MainPageDataType = {
            products: productsList,
            filters: filters,
            cart: cart!,
            switchType: params.get('switch-view'),
            view: {
                filters: selectedFilters,
                productsCount: productsList.length,
                sortBy: params.get('sortBy'),
                perPage: params.get('perPage'),
            }
        }

        callback(data);
    }

    /**
     * добавление продукта в корзину по идентификатору
     */
    addProductToCart(id: number, quantity: number = 1) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(addProductToCart({product: product, quantity: quantity}))
        }
    }
    /**
     * добавление количества продукта из инпут по идентификатору
     */
    setProductQuantityInCart(id: number, value: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(setProductQuantityInCart({product: product, quantity: value}))
        }
    }

    /**
     * удаление продукта из корзины по идентификатору
     */
    removeProductFromCart(id: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(removeProductFromCart(product))
        }
    }

    /**
     * удаление любого количесва продуктов из корзины по идентификатору
     */
    removeProductFromCartAll(id: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(removeProductFromCartAll(product))
        }
    }

    /**
     * проверка промокода
     */
    isPromocodeAvailable(name: string): boolean {
        return store.getState().promocode.available.some(code => code.name === name)
    }

    applyPromocode(name: string): void {
        const promo = store.getState().promocode.available.find(code => code.name === name)
        if (promo) {
            store.dispatch(addAppliedPromocode(promo.id))
        }
    }

    removeAppliedPromocode(id: number): void {
        const promo = store.getState().promocode.applied.find(code => code.id === id)
        if (promo) {
            store.dispatch(removeAppliedPromocode(promo.id))
        }
    }
}
