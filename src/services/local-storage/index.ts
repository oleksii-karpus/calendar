class LocalStorageService {
    get(key: string) {
        return localStorage.getItem(key);
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    setObject(key: string, value: object | []) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getObject(key: string) {
        const str = localStorage.getItem(key);
        if (str) {
            return JSON.parse(str);
        }

        return null;
    }
}

export const localStorageService = new LocalStorageService();
