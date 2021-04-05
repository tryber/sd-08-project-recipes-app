const fetchEndpoint = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    return response.ok
      ? response.json()
      : Promise.reject(new Error('API error'));
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchEndpoint;
