import React from 'react';
import { Article } from '../types/Article';
import { ArticleCard } from './ArticleCard';

type Props = {
  articles: Article[],
};

export const ArticlesList: React.FC<Props> = ({ articles }) => (
  <div className="articles">
    {articles.map(article => (
      <ArticleCard article={article} key={article.id} />
    ))}
  </div>
);
