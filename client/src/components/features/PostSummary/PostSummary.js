import React from 'react';
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';
import './PostSummary.scss';
import '../../common/Button/Button.scss';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';

const PostSummary = ({ id, title, content, author }) => (

  <article className="post-summary" >
    <SmallTitle>{title}</SmallTitle>
    <span>Author: {author}</span>
    <HtmlBox>{cutText(content)}</HtmlBox>
    <Link className="button button--primary" variant="primary" to={`/posts/${id}`}>
      Read more
    </Link>
    <Link className="button button--primary" variant="primary" to={`/posts/edit/${id}`}>
      Edit post
    </Link>
  </article >
);

function cutText(text, chars = 250) {
  if (chars < 1) {
    return "error";
  } else if (text.length > chars) {
    const cutContent = text.substr(0, text.lastIndexOf(' ', chars)) + ' ...';
    return cutContent;
  } else {
    return text;
  }
}

PostSummary.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string
};

export default PostSummary;