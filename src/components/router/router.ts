export class Router {
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
        window.addEventListener('popstate', () => this.loadRoute())
    }

    public static redirectTo(url: string) {
        history.pushState({}, '', url);
        window.dispatchEvent(new Event('popstate'));
    }

    private resolveRoute(path: string): Function | null {
        return this.routes[path] || null;
    }

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
