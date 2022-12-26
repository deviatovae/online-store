import {Unsubscribe} from "@reduxjs/toolkit";

export class Router {
    private routes: { [key: string]: Function; } = {};
    private fallbackRoute: Function | null = null;

    public static redirectTo(url: string) {
        history.pushState({}, '', url);
        window.dispatchEvent(new Event('popstate'));
    }

    /**
     * обращается к объекту routes и в поле path присваивает коллбэк
     */
    public route(path: string, view: (...args: string[]) => Unsubscribe): void {
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

    private call(callback: Function, args: string[] = []) {
        const urlBeforeCall = window.location.pathname
        const unsubscribe = callback(...args);
        const urlAfterCall = window.location.pathname
        if (urlBeforeCall !== urlAfterCall) {
            unsubscribe();
        }
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
                return this.call(this.routes[route], args);
            }
        }

        if (this.fallbackRoute) {
            this.call(this.fallbackRoute);
            return;
        }

        throw new Error(`Page "${window.location.pathname}" not found`);
    }
}
