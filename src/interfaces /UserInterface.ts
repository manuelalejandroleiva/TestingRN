export interface AuthPayload {
    email: string;
    password: string;
}   


export interface MoneyInterface {
    cantidad: number;
    createdAt: Date;
    cuenta_bancaria: number;
}