import React from 'react';
import type { NextPage } from 'next';
import { createClient } from 'contentful';
import { ArticleProps, FieldsProps } from '../index';
import { ArticlePageLayout } from '../../layouts';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const getStaticPaths = async () => {
  const data = await client.getEntries<FieldsProps>({ content_type: 'article' });

  const paths = data.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
};

export const getStaticProps = async ({ params } : {params: {slug: string;}}) => {
  const { items } = await client.getEntries({
    content_type: 'article',
    'fields.slug': params.slug,
  })

  return {
    props: {
      article: items[0]
    }
  }
};

interface ArticlePageDetailsProps {
  article: ArticleProps;
};

const ArticlePageDetails: NextPage<ArticlePageDetailsProps> = ({
  article,
}) => {
  console.log(article.fields.content.content)
  return (
    <ArticlePageLayout
      article={article}
    />
  );
};

export default ArticlePageDetails;
