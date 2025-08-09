export type ResponseRequestApi<T> = {
    success: boolean,
    message: string,
    data: T
};