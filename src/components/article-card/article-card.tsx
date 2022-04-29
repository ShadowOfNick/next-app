import React from 'react';
import Link from 'next/link';
import { ArticleTag } from '../article-tag'

interface MovieCardProps {
  title: string;
  image: string;
  tags: string[];
  dateOfPublication: string;
  link: string;
};

export const ArticleCard: React.FC<MovieCardProps> = ({
  title,
  image,
  tags,
  dateOfPublication,
  link,
}) => (
  <div className="article-card" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`}}>
    <Link href={'article-page/'+ link}>
      <a className="article-card__wrapper">
        <p className="article-card__date">
          {dateOfPublication}
        </p>

        <div>
          <h2 className="article-card__title">
            {title}
          </h2>

          <div className="article-card__tags">
            {tags.map(item => (
              <ArticleTag key={item} tag={item} />
            ))}
          </div>
        </div>
      </a>
    </Link>
  </div>
);
