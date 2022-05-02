import type { NextPage } from 'next';
import Head from 'next/head';
import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { ArticleLayout } from '../layouts';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const getStaticProps = async () => {
  const data = await client.getEntries({ content_type: 'article' });

  return {
    props: {
      article: data.items
    }
  }
};

interface MainImageProps {
  fields: {
    file: {
      fileName: string;
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
    title: string;
  };
};

interface FieldProps {
  key: string;
  value: string;
};

export interface FieldsProps {
  title: string;
  dateOfPublication: string;
  mainImage: MainImageProps;
  perex: string;
  topic: {
    fields: FieldProps;
  };
  industry: {
    fields: FieldProps;
  }[];
  content: Document;
  type: string;
  slug: string;
};

export interface ArticleProps {
  fields: FieldsProps;
  sys: {};
};

interface HomePageProps {
  article: ArticleProps[];
};

const Home: NextPage<HomePageProps> = ({
  article,
}) => {
  console.log(article);
  console.log(article[0].fields.industry.map(item => item.fields.value));
  return (
    <div className="container">
      <Head>
        <title>Articles</title>
        <meta name="description" content="Articles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <h1 className="title">
          Articles
        </h1>

        <ArticleLayout
          article={article}
        />
      </div>

      <div className="footer">
        
      </div>
    </div>
  )
};

export default Home;
