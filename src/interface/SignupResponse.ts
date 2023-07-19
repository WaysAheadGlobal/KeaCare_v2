export default interface SignupResponse {
    success: boolean,
    id: number,
    fname?: string,
    lname?: string,
    email: string
}