export default function listify(addons={}) {
  return Object.keys(addons)
               .sort()
               .map(slug => addons[slug]);
}
