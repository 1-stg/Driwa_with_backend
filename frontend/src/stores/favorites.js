import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        cars: [],
    }),

    persist: true,

    getters: {
        isCarInFavorite: (state) => (carId) => state.cars.some(car => car._id === carId)
    },
    actions: {
        toggleFavorite(car) {
            const index = this.cars.findIndex(c => c._id === car._id);
            if (index === -1) {
                this.cars.push(car);
            } else {
                this.cars.splice(index, 1);
            }
        },
        refresh() {
            this.cars = [];
        }
    }
});
