import React, { useState, useEffect } from 'react';
import '../styles/main.scss';
import {
  TextField,
  InputAdornment,
  IconButton,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@mui/material/Typography';
import { Marker } from 'react-mark.js';

import { getArticles } from '../api/articles';
import { ErrorType } from '../types/ErrorType';
import { Article } from '../types/Article';
import { ArticlesList } from './ArticlesList';
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
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [query, setQuery] = useState<string>('');
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadArticles = async () => {
    setIsLoading(true);

    try {
      const loadedArticles = await getArticles();

      setAllArticles(loadedArticles);
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
    setQuery(event.target.value);
    const articlesToShow = allArticles.filter((article: Article) => {
      return (
        article.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
        || article.summary.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
      );
    });

    setVisibleArticles(articlesToShow);

    if (visibleArticles.length === 0) {
      setError(ErrorType.FIND);
      setIsLoading(false);
    }

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
        <CircularProgress />
      )}

      {error && (
        <ErrorMessage
          error={error}
          closeError={() => setError(null)}
        />
      )}
    </div>
  );
};
