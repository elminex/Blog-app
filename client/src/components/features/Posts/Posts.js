import React from 'react';
import { PropTypes } from 'prop-types';
import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

class Posts extends React.Component {

  componentDidMount() {
    const { loadPostsByPage, initialPage, postsPerPage } = this.props;
    loadPostsByPage(initialPage, postsPerPage);
  }

  componentWillUnmount() {
    const { resetRequest } = this.props;
    resetRequest();
  }

  loadPostsPage = (page) => {
    const { loadPostsByPage, postsPerPage } = this.props;
    loadPostsByPage(page, postsPerPage);  
  }

  render() {
    const { posts, request, pages, pagination, initialPage } = this.props;
    let content;

    switch (true) {
      case (!request.pending && request.success && (posts.length > 0)):
        content = <PostsList posts={posts} />;
        break;
      case (!request.pending && request.error):
        content = <Alert variant="error">{request.error}</Alert>;
        break;
      case (!request.pending && request.success && (posts.length === 0)):
        content = <Alert variant="info">No posts</Alert>
        break;
      default:
        content = <Spinner />
    }
    return (
      <div>
        {content}
        {pagination ? <Pagination pages={pages} onPageChange={this.loadPostsPage} show={request.success} initialPage={initialPage} /> : ''}
      </div>
    );
  }
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired
    })
  ),
  resetRequest: PropTypes.func.isRequired,
  loadPostsByPage: PropTypes.func.isRequired,
};

Posts.defaultProps = {
  initialPage: 1,
  postsPerPage: 10,
  pagination: true,
}

export default Posts;