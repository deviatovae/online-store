import {CallbackFn} from "../types/callbackFn";
import {Product} from "../types/product";
import store from "../../store/store";
import products from '../../assets/data/products.json'
import {CartData, GetPriceByPromocodes} from "../types/cartData";
import {MainPageData} from "../types/mainPageData";
import {FilterCategory, FilterList, FiltersData, Limit} from "../types/filtersData";
import {addAppliedPromocode, removeAppliedPromocode} from "../../store/reducers/promocode";
import {Router} from "../router/router";
import {ProductPage} from "../types/productPage";
import {PaginationData} from "../types/paginationData";
import {UrlParam} from "../types/urlParam";
import {SortByParam} from "../types/sortByParam";
import {UrlParamValue} from "../types/urlParamValue";
import cart = require("../../store/reducers/cart");

/**
 * контроллер получает, изменяет, фильтрует данные, которые потребуются для view
 * нужно доделать редакс и роутер чтобы получить все данные, сейчас мы может прокинуть только весь массив с товарами
 */
export class Controller {
    private readonly CART_PAGE_LIMIT = 3
    private readonly MAIN_PAGE_LIMIT = 20

    /**
     * возвращает данные для корзины / иконки в хэдере
     */
    public cart(callback: CallbackFn<CartData>, perPage: number = this.CART_PAGE_LIMIT): void {
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

        const pagination = this.getPagination(cartItems.length, perPage);

        const cartData: CartData = {
            items: cartItems.slice(pagination.offset, pagination.offset + pagination.limit),
            priceAfterDiscount: priceByPromocodes(promocodes.applied),
            getPriceByPromocodes: priceByPromocodes,
            productCount: cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0),
            promocodes: store.getState().promocode,
            pagination: pagination
        }
        callback(cartData);
    }

    public product(id: string, callback: CallbackFn<ProductPage>) {
        const product = products.find((p) => p.id === Number(id));
        if (!product) {
            return Router.redirectTo('/404');
        }

        this.cart((cartData) => {
            callback({
                cart: cartData,
                product: product,
                isInCart: cartData.items.some(({product: inCartProduct}) => inCartProduct.id === product.id)
            })
        }, products.length)
    }

    /**
     * метод возвращает данные для страницы каталога и передает их в коллбэк
     */
    public catalog(callback: CallbackFn<MainPageData>) {
        const params = Router.getUrlParams()

        const selectedFilters: FilterList = {
            colors: params.get(UrlParam.COLORS)?.split(','),
            collections: params.get(UrlParam.COLLECTIONS)?.split(',').map((s) => Number(s)),
            categories: params.get(UrlParam.CATEGORIES)?.split(',').map((c => ({category: c, products: 0}))),
            price: params.has(UrlParam.MIN_PRICE) ? {
                selectedMin: Number(params.get(UrlParam.MIN_PRICE)),
                selectedMax: Number(params.get(UrlParam.MAX_PRICE)),
            } : undefined,
            size: params.has(UrlParam.MIN_SIZE) ? {
                selectedMin: Number(params.get(UrlParam.MIN_SIZE)),
                selectedMax: Number(params.get(UrlParam.MAX_SIZE)),
            } : undefined,
            stock: params.has(UrlParam.MIN_STOCK) ? {
                selectedMin: Number(params.get(UrlParam.MIN_STOCK)),
                selectedMax: Number(params.get(UrlParam.MAX_STOCK)),
            } : undefined,
        }

        const getProductsBySelectedFilters = this.getProductsFunc(products, selectedFilters, params.get(UrlParam.SEARCH_QUERY));

        if (!selectedFilters.price) {
            selectedFilters.price = getProductsBySelectedFilters(['price'], products)
                .reduce((minMax: Limit, product) => this.getDefaultMinMax(minMax, product.price), {
                    defaultMin: Number.MAX_SAFE_INTEGER,
                    defaultMax: Number.MIN_SAFE_INTEGER
                })
        }
        if (!selectedFilters.size) {
            selectedFilters.size = getProductsBySelectedFilters(['size'], products)
                .reduce((minMax: Limit, product) => this.getDefaultMinMax(minMax, product.size), {
                    defaultMin: Number.MAX_SAFE_INTEGER,
                    defaultMax: Number.MIN_SAFE_INTEGER
                })
        }
        if (!selectedFilters.stock) {
            selectedFilters.stock = getProductsBySelectedFilters(['stock'], products)
                .reduce((minMax: Limit, product) => this.getDefaultMinMax(minMax, product.stock), {
                    defaultMin: Number.MAX_SAFE_INTEGER,
                    defaultMax: Number.MIN_SAFE_INTEGER
                })
        }

        const filteredProducts = getProductsBySelectedFilters();
        filteredProducts.sort((p1, p2) => {
            const sortByValues = (params.get(UrlParam.SORT_BY) || '-').split('-')
            const sortBy = sortByValues[0] as keyof Product;
            const order = sortByValues[1] === SortByParam.DESC ? -1 : 1;

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

        const colorFilters = this.getUnique<string>(
            getProductsBySelectedFilters(['colors'], products).reduce((acc, product) => [...acc, product.color], [] as string[]),
            selectedFilters.colors || []
        )
        const collectionFilters = this.getUnique<number>(
            getProductsBySelectedFilters(['collections'], products).reduce((acc, product) => [...acc, product.collection], [] as number[]),
            selectedFilters.collections || []
        ).sort()
        const categoryFilters = [...getProductsBySelectedFilters(['categories'], products).reduce((map, product) => {
            if (map.has(product.category)) {
                const type = map.get(product.category) as FilterCategory
                type.products = type.products + 1 || 1;
            } else {
                map.set(product.category, {category: product.category, products: 1})
            }
            return map;
        }, new Map<string, FilterCategory>).values()]
        if (selectedFilters.categories) {
            selectedFilters.categories.forEach((selectedCategory) => {
                if (!categoryFilters.some((c) => c.category === selectedCategory.category)) {
                    categoryFilters.push(selectedCategory)
                }
            })
        }

        const filters: FiltersData = {
            colors: colorFilters,
            collections: collectionFilters,
            categories: categoryFilters,
            price: products.reduce((minMax: Limit, product) => this.getMinMax(minMax, product.price), {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER
            }),
            size: products.reduce((minMax: Limit, product) => this.getMinMax(minMax, product.size), {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER
            }),
            stock: products.reduce((minMax: Limit, product) => this.getMinMax(minMax, product.stock), {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER
            }),
            selected: selectedFilters,
            showFilters: params.get(UrlParam.SHOW_FILTERS) === UrlParamValue.FILTERS_SHOW
        }

        const pagination = this.getPagination(filteredProducts.length, this.MAIN_PAGE_LIMIT);
        if(!params.get(UrlParam.SORT_BY)) {
            filteredProducts.sort((item) => item.favorite ? -1 : 1)
        }
        const slicedProducts = filteredProducts.slice(pagination.offset, pagination.offset + pagination.limit)

        this.cart((cartData) => {
            callback({
                products: slicedProducts,
                filters: filters,
                cart: cartData,
                switchType: params.get(UrlParam.SWITCH_VIEW),
                view: {
                    filters: selectedFilters,
                    productsCount: filteredProducts.length,
                    sortBy: params.get(UrlParam.SORT_BY),
                    pagination: pagination,
                    selectedFilters: this.getSelectedFiltersCount(selectedFilters)
                }
            })
        }, products.length)
    }

    /**
     * добавление продукта в корзину по идентификатору
     */
    addProductToCart(id: number, quantity: number = 1) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(cart.actions.addProductToCart({product: product, quantity: quantity}))
        }
    }

    /**
     * добавление количества продукта из инпут по идентификатору
     */
    setProductQuantityInCart(id: number, value: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(cart.actions.setProductQuantityInCart({product: product, quantity: value}))
        }
    }
    /**
     * удаление продукта из корзины по идентификатору
     */
    removeProductFromCart(id: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(cart.actions.removeProductFromCart(product))
        }
    }

    /**
     * удаление любого количесва продуктов из корзины по идентификатору
     */
    removeProductFromCartAll(id: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(cart.actions.removeProductFromCartAll(product))
        }
    }

    async clearCart() {
        store.dispatch(cart.actions.clearCart());
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

    private getProductsFunc(products: Product[], selectedFilters: FilterList, query: string | null) {
        return (except: (keyof FilterList)[] = [], fallbackResult: Product[] = []): Product[] => {
            const filters: FilterList = JSON.parse(JSON.stringify(selectedFilters))
            let key: keyof FilterList;
            for (key in filters) {
                if (except.includes(key)) {
                    delete filters[key]
                }
            }
            const result = products.filter(p => {
                if (filters.colors?.indexOf(p.color) === -1) {
                    return false;
                }
                if (filters.collections?.indexOf(p.collection) === -1) {
                    return false
                }
                if (filters.categories?.some((c) => c.category === p.category) == false) {
                    return false
                }
                if ((filters.price?.selectedMin || 0) > p.price || (filters.price?.selectedMax || p.price) < p.price) {
                    return false
                }
                if ((filters.size?.selectedMin || 0) > p.size || (filters.size?.selectedMax || p.size) < p.size) {
                    return false
                }
                if ((filters.stock?.selectedMin || 0) > p.stock || (filters.stock?.selectedMax || p.stock) < p.stock) {
                    return false
                }

                if (query) {
                    const queries = query.split(' ');
                    const isMatch = (q: string) => {
                        const nameMatch = p.name.toLowerCase().includes(q.toLowerCase())
                        const colorMatch = p.color.toLowerCase().includes(q.toLowerCase())
                        const categoryMatch = p.category.toLowerCase().includes(q.toLowerCase());
                        const sizeMatch = p.size === parseInt(q)
                        const stockMatch = p.stock === parseInt(q)
                        const collectionMatch = p.collection === parseInt(q)
                        const priceMatch = p.price === parseFloat(q)

                        return nameMatch || colorMatch || sizeMatch || stockMatch ||
                            collectionMatch || categoryMatch || priceMatch
                    }

                    if (!isMatch(query) && !queries.every((q) => isMatch(q))) {
                        return false
                    }
                }

                return true;
            })

            return result.length ? result : fallbackResult;
        }
    }

    getLastPageInCart(): number {
        return this.getPagination(store.getState().cart.length, this.CART_PAGE_LIMIT).pageCount
    }

    private getPagination(count: number, defaultPerPage: number): PaginationData {
        const params = Router.getUrlParams();
        const page = Number(params.get(UrlParam.PAGE) || 1)
        const perPage = params.get(UrlParam.PER_PAGE) === UrlParamValue.PAGINATION_ALL ? 0 : Number(params.get(UrlParam.PER_PAGE) || defaultPerPage)
        const limit = perPage || count
        const pageCount = Math.ceil(count / limit)
        const offset = (page - 1) * limit

        return {
            offset,
            limit,
            pageCount,
            perPage,
            page,
        }
    }
    private getMinMax(minMax: Limit, value: number): Limit {
        if (minMax.min) {
            minMax.min = minMax.min > value ? value : minMax.min
        }
        if (minMax.max) {
            minMax.max = minMax.max < value ? value : minMax.max
        }
        return minMax;
    }

    private getDefaultMinMax(minMax: Limit, value: number): Limit {
        if (minMax.defaultMin) {
            minMax.defaultMin = minMax.defaultMin > value ? value : minMax.defaultMin
        }
        if (minMax.defaultMax) {
            minMax.defaultMax = minMax.defaultMax < value ? value : minMax.defaultMax
        }
        return minMax;
    }

    private getUnique<T>(...values: T[][]) {
        return [...(new Set<T>(values.reduce((acc, value) => [...acc, ...value], [])))]
    }

    private getSelectedFiltersCount(selectedFilters: FilterList) {
        return (Object.keys(selectedFilters) as Array<keyof FilterList>).reduce((count, key) => {
            const filter = selectedFilters[key];
            if (!filter) {
                return count;
            }
            if (Array.isArray(filter)) {
                return count + filter.length;
            }
            return count + 1;
        }, 0);
    }
}
