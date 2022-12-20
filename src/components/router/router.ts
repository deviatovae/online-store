export class Router {
    private routes: { [key: string]: Function; } = {};
    private fallbackRoute: Function | null;

    constructor() {
        this.fallbackRoute = null;
    }

    /**
     * обращается к объекту routes и в поле path присваивает коллбэк
     */
    public route(path: string, view: Function): void {
        this.routes[path] = view;
    }

    public fallback(view: Function): void {
        this.fallbackRoute = view
    }

    /**
     * при загрузке страницы или при изменении в хэше вызывает loadRoute
     */
    public start() {
        window.addEventListener('load', () => this.loadRoute());
        window.addEventListener('hashchange', () => this.loadRoute());
        window.addEventListener('popstate', () => this.loadRoute())
    }

    public static redirectTo(url: string) {
        history.pushState({}, '', url);
        window.dispatchEvent(new Event('popstate'));
    }

    /**
     * обращается в полю routes и достает оттуда значение по ключу и возвращает функцию (с url)
     */
    private resolveRoute(path: string): Function | null {
        return this.routes[path] || null;
    }

    /**
     * ищет и вызывает функцию которая была записана в routes по url (после #) или возывает fallback
     */
    private loadRoute(): void {
        let url = window.location.pathname;
        let route = this.resolveRoute(url);

        if (!route) {
            if (this.fallbackRoute) {
                this.fallbackRoute();
                return;
            } else {
                throw new Error(`Page "${url}" not found`);
            }
        }

        route();
    };
}
