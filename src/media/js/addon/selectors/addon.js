export function addonPageSelector(substate, router, reverse=false) {
  const pageNum = parseInt(router.params.page, 10) || 1;
  const page = substate.pages[pageNum] || {
    addons: [],
    hasNextPage: false,
    hasPrevPage: false,
    isFetching: true,
    page: pageNum
  };

  return {
    addons: reverse ? page.addons.reverse() : page.addons,
    hasNextPage: page.hasNextPage,
    hasPrevPage: page.hasPrevPage,
    isFetching: page.isFetching,
    page: pageNum
  };
}
