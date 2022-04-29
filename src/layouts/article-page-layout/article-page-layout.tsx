import React, { ReactNode }from 'react';
import Image from 'next/image';
import { ArticleProps } from '../../pages/index';
import { ArticleTag } from '../../components';
import { Block, BLOCKS, Inline } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';

interface ArticlePageLayoutProps {
  article: ArticleProps;
};

const getId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
};

export const ArticlePageLayout: React.FC<ArticlePageLayoutProps> = ({
  article,
}) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => (
        <h1>
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => (
        <h2>
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => (
        <h3>
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node: Block | Inline, children: ReactNode) => (
        <h4>
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node: Block | Inline, children: ReactNode) => (
        <h5>
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node: Block | Inline, children: ReactNode) => (
        <h6>
          {children}
        </h6>
      ),
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => (
        <p>
          {children}
        </p>
      ),
      [BLOCKS.OL_LIST]: (node: Block | Inline, children: ReactNode) => (
          <ol>
            {children}
          </ol>
      ),
      [BLOCKS.UL_LIST]: (node: Block | Inline, children: ReactNode) => (
          <ul>
            {children}
          </ul>
      ),
      [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: ReactNode) => (
        <li>
          {children}
        </li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => (node.data.target.fields.file.details.image ? (
          <Image
            src={`https:${node.data.target.fields.file.url}?w=1060`}
            alt={node.data.target.fields.title}
            width={node.data.target.fields.file.details.image.width}
            height={node.data.target.fields.file.details.image.height}
          />
      ) : (
        <p className="rich-text__error-message">
          error
        </p>
      )),
      [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
        if (node.data.target.sys.contentType.sys.id === 'articleVideo') {
          return (
            <iframe
              className="article-page-layout__content__video"
              src={`https://www.youtube.com/embed/${getId(node.data.target.fields.url)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          );
        }
      },
    },
  };

  return (
    <div className="article-page-layout">
      <div className="article-page-layout__hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${article.fields.mainImage.fields.file.url})`}}>
        <h2 className="article-page-layout__hero__title">
          {article.fields.title}
        </h2>

        <p className="article-page-layout__hero__date">
          {article.fields.dateOfPublication}
        </p>

        <div className="article-page-layout__hero__tags">
          {article.fields.industry.map(item => (
            <ArticleTag
              key={item.fields.key}
              tag={item.fields.value}
            />
          ))}
        </div>
      </div>

      <div className="article-page-layout__wrapper">
        <h2>
          {article.fields.perex}
        </h2>

        <ArticleTag black tag={article.fields.topic.fields.value} />

        <div className="article-page-layout__content">
          {documentToReactComponents(article.fields.content, options)}
        </div>
      </div>
    </div>
  );
};