export interface ApolloContext {
  userId: string;
}

export interface PaginatedList<T> {
  items: T[];
  cursor?: string;
  totalFound: number;
}
