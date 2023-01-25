export const getArticles = () => fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=300')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
