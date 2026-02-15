export interface Pagination {
    offset: number
    limit: number;
    query?: string;
    from?: string;
    to?: string;
    sortBy?: "createdAt" | "price";
    order?: "asc" | "desc";
}

export interface QueryProduct {
    name?: {
        contains?: string;
        mode?: "insensitive" | "default";
    };
    createdAt?: {
        gte?: Date;
        lte?: Date;
    };
}