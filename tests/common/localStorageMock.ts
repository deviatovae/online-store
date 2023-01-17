class LocalStorageMock {
    store: { [key: string]: string } = {};
    length: number = 0;

    key(n: number): string {
        if (typeof n === 'undefined') {
            throw new Error(
                "Uncaught TypeError: Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
            );
        }

        if (n >= Object.keys(this.store).length) {
            return '';
        }

        return Object.keys(this.store)[n];
    }

    getItem(key: string): string | null {
        if (!Object.keys(this.store).includes(key)) {
            return null;
        }

        return this.store[key];
    }

    setItem(key: string, value: string): undefined {
        if (typeof key === 'undefined' && typeof value === 'undefined') {
            throw new Error(
                "Uncaught TypeError: Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 0 present."
            );
        }

        if (typeof value === 'undefined') {
            throw new Error(
                "Uncaught TypeError: Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 1 present."
            );
        }

        if (!key) return undefined;

        this.store[key] = value.toString() || '';
        this.length = Object.keys(this.store).length;

        return undefined;
    }

    removeItem(key: string): undefined {
        if (typeof key === 'undefined') {
            throw new Error(
                "Uncaught TypeError: Failed to execute 'removeItem' on 'Storage': 1 argument required, but only 0 present."
            );
        }

        delete this.store[key];
        this.length = Object.keys(this.store).length;
        return undefined;
    }

    clear(): undefined {
        this.store = {};
        this.length = 0;

        return undefined;
    }
}

global['localStorage'] = new LocalStorageMock()
