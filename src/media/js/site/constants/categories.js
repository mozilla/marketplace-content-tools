/*
    Category constants and helpers.
*/
const gettext = cat => cat;
const categories = [
  {value: 'games', label: gettext('Games')},
  {value: 'books-comics', label: gettext('Books & Comics')},
  {value: 'business', label: gettext('Business')},
  {value: 'education', label: gettext('Education')},
  {value: 'entertainment', label: gettext('Entertainment')},
  {value: 'food-drink', label: gettext('Food & Drink')},
  {value: 'health-fitness', label: gettext('Health & Fitness')},
  {value: 'humor', label: gettext('Humor')},
  {value: 'internet', label: gettext('Internet')},
  {value: 'kids', label: gettext('Kids')},
  {value: 'lifestyle', label: gettext('Lifestyle')},
  {value: 'maps-navigation', label: gettext('Maps & Navigation')},
  {value: 'music', label: gettext('Music')},
  {value: 'news', label: gettext('News')},
  {value: 'personalization', label: gettext('Personalization')},
  {value: 'photo-video', label: gettext('Photo & Video')},
  {value: 'productivity', label: gettext('Productivity')},
  {value: 'reference', label: gettext('Reference')},
];
export default categories;


const humanizeCategory = slug => {
  // value => label.
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].value === slug) {
      return categories[i].label;
    }
  }
}
export {humanizeCategory};
