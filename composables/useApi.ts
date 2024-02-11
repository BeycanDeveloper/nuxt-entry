export const useApi = async (path: string, params?: object, method: string = 'GET'): Promise<any>  => {
    const token = useCookie('token')
    const response = await fetch(`http://localhost:3001/${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`
        },
        method,
        body: JSON.stringify(params)
    })
    
    return {
        data: await response.json(),
        status: response.status
    }
}