const filtering = (recipes, filter) => [...recipes.filter(
  (recipe) => recipe.type.includes(filter) || filter === 'all',
)];

export default filtering;
