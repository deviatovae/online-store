import './productListView.scss'

import {ProductView} from "./productView";
import {Product} from "../../../../types/product";
import {View} from "../../../view";

export class ProductListView extends View<Product[]> {
    protected views = {
        product: new ProductView(),
    }

    public render(products: Product[]): string {
        return products.map((product) => this.views.product.render(product)).join('')
    }
}

