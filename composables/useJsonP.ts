export const useJsonP = async (path: string): Promise<any>  => {
    const { execute, data } = useFetch(() => `https://jsonplaceholder.typicode.com/${path}`);

    await execute();

    return data.value;
}