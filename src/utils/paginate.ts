import _ from "lodash";

export const handlePagination = (
  posts: Record<string, any>[],
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(posts).slice(startIndex).take(pageSize).value();
};
