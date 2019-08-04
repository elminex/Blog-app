import React, { useEffect } from 'react';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import SinglePost from '../../features/SinglePost/SinglePost';
import PropTypes from 'prop-types';

const RandomPost = ({ loadRandomPost, singlePost, request, resetRequest }) => {

  useEffect(() => {
    loadRandomPost();
    return () => resetRequest();
  }, [loadRandomPost, resetRequest]);

  let content;
  switch (true) {
    case (request.success && !request.pending):
      content = <SinglePost post={singlePost} />;
      break;
    case (!request.pending && request.error):
      content = <Alert variant="error">{request.error}</Alert>;
      break;
    case (!request.pending && request.success && !singlePost):
      content = <Alert variant="error">Wygląda na to, że nic tu nie ma</Alert>;
      break;
    default:
      content = <Spinner />
  }

  return (
    <div>
      {content}
    </div>
  )
}

RandomPost.propTypes = {
  singlePost: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  loadRandomPost: PropTypes.func.isRequired,
};

export default RandomPost;
