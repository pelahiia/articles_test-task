import React, { useState, useEffect } from 'react';
import '../styles/main.scss';
import {
  TextField,
  InputAdornment,
  IconButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@mui/material/Typography';
import { Marker } from 'react-mark.js';

import { getArticles } from '../api/articles';
import { ErrorType } from '../types/ErrorType';
import { Article } from '../types/Article';
import { ArticlesList } from './ArticlesList';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'regular',
    ].join(','),
    fontSize: 16,
  },
});

export const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [query, setQuery] = useState('');
  const [visibleArticles, setVisibleArticles] = useState<Article[]>(articles);
  const [isLoading, setIsLoading] = useState(false);

  const loadArticles = async () => {
    setIsLoading(true);

    try {
      const loadedArticles = await getArticles();

      setArticles(loadedArticles);
      setVisibleArticles(loadedArticles);
    } catch {
      setError(ErrorType.LOAD);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 5000);
    }
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const articlesToShow = articles.filter((article) => {
      return (
        article.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        || article.summary.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    });

    setVisibleArticles(articlesToShow);

    if (visibleArticles.length === 0) {
      setError(ErrorType.FIND);
      setIsLoading(false);
    }

    setQuery(event.target.value);
    setIsLoading(false);
  };

  return (
    <div className="home_page">
      <ThemeProvider theme={theme}>
        <Typography>
          Filter by keywords
        </Typography>
      </ThemeProvider>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton disableRipple>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          boxShadow: 3,
          borderRadius: 1,
          marginTop: 1,
          marginBottom: 5,
          padding: 0,
        }}
      />
      <div className="home__result__text">
        {`Results: ${visibleArticles.length}`}
      </div>

      {!isLoading ? (
        <Marker mark={query}>
          <ArticlesList articles={visibleArticles} />
        </Marker>
      ) : (
        <Loader />
      )}

      {error && (
        <ErrorMessage error={error} />
      )}
    </div>
  );
};
