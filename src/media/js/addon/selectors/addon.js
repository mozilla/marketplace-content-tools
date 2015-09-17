export function addonListSelector(addons={}) {
  return Object
    .keys(addons)
    .map(slug => addons[slug])
    .sort((a, b) => {
      // Order by newest top.
      if (a.id < b.id) {
        return 1;
      } else if (a.id > b.id) {
        return -1;
      }
      return 0;
    })
}


export function versionListSelector(versions={}) {
  return Object
    .keys(versions)
    .sort()
    .reverse()
    .map(id => versions[id]);
}
