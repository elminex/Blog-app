import React, { useEffect } from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import PostForm from '../../features/PostForm/PostForm';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

const EditPost = ({ match, resetRequest, editPost, loadPost, request, singlePost }) => {

  useEffect(() => {
    loadPost(match.params.id);
    return () => resetRequest();
  }, [loadPost, match, resetRequest]);

  let pageContent;
  const fakeRequest = { success: null, pending: null, error: null };
  
  switch (true) {
    case (request.success):
      pageContent = <PostForm
        editMode={true}
        request={fakeRequest}
        editPost={editPost}
        singlePost={singlePost}
        resetRequest={resetRequest}
        id={match.params.id} />
      break;
    case (request.error):
      pageContent = <Alert variant="error">{request.error}</Alert>;
      break;
    default:
      pageContent = <Spinner />
  }
  
  return (
    <div>
      <PageTitle>Edit Post</PageTitle>
      {pageContent}
    </div>
  );
}
export default EditPost;
