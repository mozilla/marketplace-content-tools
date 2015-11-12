export default function generatePageSelector(substate, router, key) {
  const pageNum = parseInt(router.params.page, 10) || 1;
  const page = substate.pages[pageNum] || {
    [key]: [],
    hasNextPage: false,
    hasPrevPage: false,
    isFetching: true,
    page: pageNum
  };

  return {
    [key]: page[key],
    hasNextPage: page.hasNextPage,
    hasPrevPage: page.hasPrevPage,
    isFetching: page.isFetching,
    page: pageNum
  };
}
