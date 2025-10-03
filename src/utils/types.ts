export type JWTPayload = {
    id: number;
    role: string;
    name: string;
}

export type Id = string | number

export type Column = {
    id: Id
    title: string

}
export type Task = {
    id: Id
    columnId: Id
    content:string
    obj: Record<string, boolean> | null | undefined
}