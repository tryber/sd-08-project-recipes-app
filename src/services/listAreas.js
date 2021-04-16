const LIST_AREA = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

const fetchAreaList = () => fetch(LIST_AREA);

export default fetchAreaList;
