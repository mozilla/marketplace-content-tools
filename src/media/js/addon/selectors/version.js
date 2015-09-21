export function versionListSelector(versions={}) {
  return Object
    .keys(versions)
    .sort()
    .reverse()
    .map(id => versions[id]);
}
