// Obtener global variable de .ENV
export const GetEnvVariables = () => {

    return {

        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_API_KEY: import.meta.env.VITE_API_KEY,

    }
}
