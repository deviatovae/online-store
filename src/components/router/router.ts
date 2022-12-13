export default class Router {
    private routes: { [key: string]: Function; } = {};
    private fallbackRoute: Function | null;

    constructor() {
        this.fallbackRoute = null;
    }

    public route(path: string, view: Function): void {
        this.routes[path] = view;
    }

    public fallback(view: Function): void {
        this.fallbackRoute = view
    }

    public start() {
        window.addEventListener('load', () => this.loadRoute());
        window.addEventListener('hashchange', () => this.loadRoute());
    }

    private resolveRoute(path: string): any {
        return this.routes[path] || null;
    }

    private loadRoute(): void {
        let url = window.location.hash.slice(1) || '/';
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
