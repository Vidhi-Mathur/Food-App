import { useEffect, useState, useCallback } from "react"

async function sendHttpRequest(url, configuration){
    const response = await fetch(url, configuration)
    const responseData = await response.json()
    if(!response.ok){
        throw new Error(responseData.message || 'Something went wrong, failed to send request')
    }
    return responseData
}
export default function useHttp(url, configuration, initialData){
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    function clearData(){
        setData(initialData)
    }
    const sendRequest = useCallback(async function sendRequest(data){
        setIsLoading(true)
        try{
            const responseData = await sendHttpRequest(url, {...configuration, body: data})
            setData(responseData)
        }
        catch(error){
            setError(error.message || 'Something went wrong')
        }
        setIsLoading(false)
    }, [url, configuration])

    useEffect(() => {
        if((configuration && (configuration.method === 'GET' || !configuration.method)) || !configuration){
            sendRequest()
        }
    }, [sendRequest, configuration])

    return {data, isLoading, error, sendRequest, clearData}
}