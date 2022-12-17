import './productListView.scss'
import {ViewInterface} from "../../../viewInterface";

import {ProductView} from "./productView";
import {Product} from "../../../../types/product";

export class ProductListView implements ViewInterface<Product[]> {
    
    private productView: ProductView = new ProductView()

    render(products: Product[]): string {
        const cards = products.map((product) => this.productView.render(product))
        return `
        ${cards.join(' ')}
    `
    }
    
}

