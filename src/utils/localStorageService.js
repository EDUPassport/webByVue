// localStorageService.js

const localStorageService = {
    setItem(key, value, expirationInMinutes) {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + expirationInMinutes);

        const item = {
            value: value,
            expirationDate: expirationDate.getTime()
        };

        localStorage.setItem(key, JSON.stringify(item));
    },

    getItem(key) {
        const item = JSON.parse(localStorage.getItem(key));

        if (!item) {
            return null;
        }

        const expirationDate = new Date(item.expirationDate);

        if (expirationDate <= new Date()) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    }
};

export default localStorageService;