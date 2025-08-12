// Obtener global variable de .ENV
export const GetEnvVariables = () => {

    return {

        VITE_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
        VITE_API_KEY: process.env.NEXT_PUBLIC_API_KEY ?? "",

    }
}
