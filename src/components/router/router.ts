export class Router {
    private routes: { [key: string]: Function; } = {};
    private fallbackRoute: Function | null;

    constructor() {
        this.fallbackRoute = null;
    }

    public static redirectTo(url: string) {
        history.pushState({}, '', url);
        window.dispatchEvent(new Event('popstate'));
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

    /**
     * ищет и вызывает функцию которая была записана в routes по url (после #) или возывает fallback
     */
    private loadRoute(): void {
        let url = window.location.pathname;

        for (let route of Object.keys(this.routes)) {
            const routeSplit = route.split('/');
            const urlSplit = url.split('/');
            const args: string[] = [];

            const isMatch = urlSplit.every((urlPart, i) => {
                const routePart = routeSplit[i];
                if (routePart && routePart.indexOf(':') >= 0) {
                    args.push(urlPart)
                    return true;
                }
                return urlPart === routePart;
            });

            if (isMatch) {
                return this.routes[route](...args);
            }
        }

        if (this.fallbackRoute) {
            this.fallbackRoute();
            return;
        }

        throw new Error(`Page "${url}" not found`);
    }
    ;
}
