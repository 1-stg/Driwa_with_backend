// composables/favorites.js
import { ref, reactive } from 'vue'

export function provideFavorites() {
    const state = reactive({
        cars: []
    });

    const loadFavorites = () => {
        const data = localStorage.getItem('favoriteCars');
        state.cars = data ? JSON.parse(data) : [];
        return state.cars;
    };

    const toggleFavorite = (car) => {
        let oldData = loadFavorites();
        const index = oldData.findIndex(c => c._id === car._id);

        if (index !== -1) {
            oldData.splice(index, 1);
        } else {
            oldData.push(car);
        }

        localStorage.setItem('favoriteCars', JSON.stringify(oldData));
        state.cars = oldData;
        return index === -1;
    };

    const isFavorite = (carId) => {
        return state.cars.some(car => car._id === carId);
    };

    const refresh = () => {
        loadFavorites();
    };

    return {
        state,
        loadFavorites,
        toggleFavorite,
        isFavorite,
        refresh
    };
}