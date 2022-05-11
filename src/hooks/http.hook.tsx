import {useState, useCallback} from "react";

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<any>(null);

    const request = useCallback(async ({
        url, 
        method = "GET",
        body = null, 
        headers = {
            "Content-type": "application/json"
        }
    }: {
        url: string, 
        method?: "GET" | "POST", 
        body?: any, 
        headers?: {
            [key: string]: string
        }
    }) => {
        setIsLoading(true);

        try{
            const result = await fetch(url, {method, body, headers});
            
            if(!result.ok) {
                throw Error(`Could not fetch ${url} with status ${result.status}`);
            }
            
            const data = result.json();

            setIsLoading(false);
            return data;
        } catch(e: any) {
            setIsLoading(false);
            setIsError(e.message)

            throw e;
        }
    }, [])

    const clearError  = useCallback(() => setIsError(null), []);

    return {isLoading, isError, clearError, request}
}