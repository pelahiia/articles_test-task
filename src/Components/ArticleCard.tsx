import React from 'react';
import moment from 'moment';
import { Article } from '../types/Article';
import dateIcon from '../images/icons-calendar-24.png';
import readmoreIcon from '../images/icons-right-arrow.png';

type Props = {
  article: Article,
};

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const {
    title,
    imageUrl,
    publishedAt,
    summary,
    url,
  } = article;

  return (
    <div className="article">
      <div className="article__image">
        <img
          src={imageUrl}
          alt="Article logo"
        />
      </div>

      <div className="article-content">
        <div className="article__date">
          <img
            className="article__date-logo"
            src={dateIcon}
            alt="Calendar icon"
          />
          <div className="article__date-left">
            {moment(publishedAt).format('MMM Do, YYYY')}
          </div>
        </div>
        <p className="title-content">
          {title}
        </p>

        <div className="summary">
          <p>
            {summary}
          </p>
        </div>

        <div className="read-more">
          <a
            className="read-more-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
          <img
            className="read-more-icon"
            src={readmoreIcon}
            alt="Read more icon"
          />
        </div>
      </div>
    </div>
  );
};
