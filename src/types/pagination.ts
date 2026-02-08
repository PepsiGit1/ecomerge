export interface Pagination {
    offset: number
    limit: number;
    query?: string;
    sortBy?: "createdAt" | "price";
    order?: "asc" | "desc";
}

