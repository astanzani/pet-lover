export interface PaginatedList<T> {
  items: T[];
  cursor?: string;
}
