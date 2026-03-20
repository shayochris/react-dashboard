export class lStorage {
    static #isClient = typeof window !== "undefined";

    static set(key: string, value: unknown) {
        if (!lStorage.#isClient) return;
        localStorage.setItem(key, JSON.stringify(value));
    }

    static setMany(payload: Record<string, unknown>) {
        if (!lStorage.#isClient) return;
        Object.entries(payload).forEach(([key, value]) =>
            lStorage.set(key, value),
        );
    }

    static get<TData = unknown>(key: string) {
        if (!lStorage.#isClient) return;
        const stringifiedData = localStorage.getItem(key);

        const data = stringifiedData ? JSON.parse(stringifiedData) : undefined;
        return data as TData | undefined;
    }

    static remove(key: string) {
        if (!lStorage.#isClient) return;
        localStorage.removeItem(key);
    }

    static removeMultiple(keys: string[]) {
        if (!lStorage.#isClient) return;
        keys.forEach((key) => lStorage.remove(key));
    }
}

export const lsKeys = {
    TOKENS: {
        ACCESS: "access-token",
        REFRESH: "refresh-token",
    },
};
