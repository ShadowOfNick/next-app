import React from "react";

interface ArticleTagProps {
  tag: string;
  black?: boolean;
};

export const ArticleTag: React.FC<ArticleTagProps> = ({
  tag,
  black = false,
}) => (
  <div className={`article-tag${black ? ' article-tag--black' : ''}`}>
    {tag}
  </div>
);
