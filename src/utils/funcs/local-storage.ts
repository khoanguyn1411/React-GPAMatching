export namespace LocalStorage {
  /**
   * Get values by key from local storage.
   * @param key The key by which the value is stored.
   * @returns Return null if there is no value or key, otherwise return corresponding value.
   */
  export async function getValue<T>(key: string): Promise<T | null> {
    const value = localStorage.getItem(key);
    if (value != null) {
      try {
        return JSON.parse(value);
      } catch (error) {
        remove(key);
        return null;
      }
    }
    return null;
  }

  /**
   * Add or write values by key to local storage.
   * @param key The key by which the value is stored.
   * @param value Value that needs to be stored.
   */
  export async function setValue<T>(key: string, value: T): Promise<void> {
    if (value != null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Remove key from local storage.
   * @param key The key that need to be removed.
   */
  export async function remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
