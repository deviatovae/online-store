/** тип callback для контроллеров. generic используется, чтобы указать какого типа будут данные */
export type CallbackFn<T> = (data: T) => void;
