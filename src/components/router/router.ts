import {Unsubscribe} from "@reduxjs/toolkit";

export class Router {
    private routes: { [key: string]: Function; } = {};
    private fallbackRoute: Function | null = null;

    public static getUrlParams(): URLSearchParams {
        return new URLSearchParams(window.location.search)
    }

    public static setUrlParam(key: string, value: string) {
        const params = Router.getUrlParams();
        params.set(key, value)
        Router.redirectTo('?' + params.toString())
    }

    public static addUrlParamValue(key: string, value: string) {
        const params = Router.getUrlParams();
        const oldValue = params.get(key);
        if (!oldValue) {
            return Router.setUrlParam(key, value);
        }
        params.set(key, oldValue + ',' + value)
        Router.redirectTo('?' + params.toString())
    }

    public static removeUrlParamValue(key: string, value: string) {
        const params = Router.getUrlParams();
        const oldValue = params.get(key)?.split(',');
        const index = oldValue?.indexOf(value)
        if (oldValue && index !== undefined && index > -1) {
            oldValue.splice(index, 1);
            params.set(key, oldValue.join(','))
        }

        if (!params.get(key)) {
            params.delete(key)
        }

        Router.redirectTo('?' + params.toString())
    }

    public static removeUrlParamKey(key: string) {
        const params = Router.getUrlParams();
        params.delete(key)
        Router.redirectTo('?' + params.toString())
    }

    public static redirectTo(url: string): void {
        history.pushState({previousUrl: window.location.href}, '', url);
        window.dispatchEvent(new Event('popstate'));
    }

    public static goBack(fallbackUrl: string): void {
        Router.redirectTo(window.history.state.previousUrl ?? fallbackUrl);
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
    public start(): void {
        window.addEventListener('load', () => this.loadRoute());
        window.addEventListener('hashchange', () => this.loadRoute());
        window.addEventListener('popstate', () => this.loadRoute())
    }

    private call(callback: Function, args: string[] = []): void {
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
