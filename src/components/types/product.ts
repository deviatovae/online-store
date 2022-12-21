/** тип для описания полей нашего продукта из products.json */
export type Product = {
    id: number
    name: string
    price: number
    collection: number
    stock: number
    color: string
    size: number
    favorite: boolean
    category: string
    images: string[]
}
