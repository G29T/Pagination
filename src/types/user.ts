type Address = {
    street: string,
    suite: string,
    city: string
}

export type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address
};