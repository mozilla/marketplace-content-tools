export default function listify(addons) {
	if (!addons) {
		return [];
	}
  return Object.keys(addons)
               .sort()
               .map(slug => addons[slug]);
}
