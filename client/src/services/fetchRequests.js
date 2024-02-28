export const fetchDailyBoard = async () => {
    try {
        const url = new URL(import.meta.env.VITE_API_DAILY_URL);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
export const fetchBoard = async () => {
    try {
        const url = new URL(import.meta.env.VITE_API_URL);
        const params = {
            wordSize: 6,
            boardSize: 6,
        };
        url.search = new URLSearchParams(params);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};