export interface ViewInterface<T> {
    render(data?: T): string;
}
