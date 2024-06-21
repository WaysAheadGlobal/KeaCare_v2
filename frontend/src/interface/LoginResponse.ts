export default interface LoginResponse {
    success: boolean,
    id: number,
    fname?: string,
    lname?: string,
    email: string,
    error?: string,
}
