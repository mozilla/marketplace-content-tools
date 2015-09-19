export function addonListSelector(addons={}, reverse=false) {
  const addonList = Object
    .keys(addons)
    .map(slug => addons[slug])
    .sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  return reverse ? addonList.reverse() : addonList;
}
