import React from 'react';
import { ArticleCard } from '../../components/article-card';
import { ArticleProps } from '../../pages/index';

interface ArticleLayoutProps {
 article: ArticleProps[]
};

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  article,
}) => (
  <div className="article-layout">
    {article.map((item, index) => (
      <ArticleCard
        key={index}
        title={item.fields.title}
        image={item.fields.mainImage.fields.file.url}
        tags={item.fields.industry.map(item => item.fields.value)}
        dateOfPublication={item.fields.dateOfPublication}
        link={item.fields.slug}
      />
    ))}
  </div>
);
