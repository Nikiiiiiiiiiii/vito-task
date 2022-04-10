import { PaginationArgs } from '../dto/pagination-args';

export const paginationUtil = (
  paginationArgs: PaginationArgs,
): PaginationUtilResponse => ({
  skip: paginationArgs.itemsPerPage * (paginationArgs.page - 1),
  limit: paginationArgs.itemsPerPage,
});

interface PaginationUtilResponse {
  readonly skip: number;
  readonly limit: number;
}
