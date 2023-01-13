export function formatPrice(price: number) {
    return price.toFixed(2)
}

export function capitalizeFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
