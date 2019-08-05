import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import { withRouter } from 'react-router-dom';
import { FacebookProvider, Comments, ShareButton } from 'react-facebook';
import { PropTypes } from 'prop-types'
import { BASE_URL } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import './SinglePost.scss';
import Votes from '../../features/Votes/VotesContainer';

const SinglePost = ({ post, location }) => (
  <>
    <PageTitle>{post.title}</PageTitle>
    <span>Author: {post.author}</span>
    <HtmlBox>{post.content}</HtmlBox>
    <Votes id={post.id} singlePost={post}/>
    <FacebookProvider appId="1211874079019883">
      <ShareButton className="fb-share-button" href={`${BASE_URL}${location.pathname}`}>
        <FontAwesomeIcon icon={faFacebookSquare} className="fb-icon" />
        Share on Facebook
      </ShareButton>
      <Comments href={`${BASE_URL}${location.pathname}`} />
    </FacebookProvider>
  </>
);

SinglePost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    votes: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string
  })
};

export default withRouter(props => <SinglePost {...props} />);