import { PaginationArgs } from '../dto/pagination-args';

export const paginationUtil = (
  paginationArgs: PaginationArgs,
): PaginationUtilResult => ({
  skip: paginationArgs.itemsPerPage * (paginationArgs.page - 1),
  limit: paginationArgs.itemsPerPage,
});

interface PaginationUtilResult {
  readonly skip: number;
  readonly limit: number;
}
