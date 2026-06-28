import { ref } from 'vue';
import api from '@/api/axios';

export function useCars() {
    const cars = ref([]);
    const isLoading = ref(false);

    const getAllCars = async () => {
        isLoading.value = true;
        try {
            let response = await api.get('/getallcars');
            cars.value = response.data;
        } catch (error) {
            console.error('Ошибка при получении машин:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        cars,
        isLoading,
        getAllCars
    };
}
