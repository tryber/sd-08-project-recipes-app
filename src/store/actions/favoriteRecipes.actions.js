export default function updateFavorites(data) {
  return {
    type: 'UPDATE_FAVORITES',
    payload: data,
  };
}
