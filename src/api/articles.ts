const urlAPI = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=150';

export const getArticles = () => fetch(urlAPI)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
