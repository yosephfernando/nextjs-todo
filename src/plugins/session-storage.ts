export class SessionStorage {
    private isAvailable(): boolean {
        try {
            return typeof localStorage !== "undefined";
        } catch {
            return false;
        }
    }

    save<T>(key: string, value: T): void {
        if (!this.isAvailable()) return;
        try {
            const data = typeof value === "string" ? value : JSON.stringify(value);
            localStorage.setItem(key, data);
        } catch (e) {
            console.error("Failed to save to session storage:", e);
        }
    }

    load<T = string>(key: string): T | null {
        if (!this.isAvailable()) return null;
        try {
            const data = localStorage.getItem(key);
            if (!data) return null;

            // Try to parse JSON, fallback to string
            try {
                return JSON.parse(data) as T;
            } catch {
                return data as unknown as T;
            }
        } catch (e) {
            console.error("Failed to load from session storage:", e);
            return null;
        }
    }

    delete(key: string): void {
        if (!this.isAvailable()) return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Failed to delete from session storage:", e);
        }
    }

    clear(): void {
        if (!this.isAvailable()) return;
        try {
            localStorage.clear();
        } catch (e) {
            console.error("Failed to clear session storage:", e);
        }
    }
}