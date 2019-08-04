import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import PostsCounter from '../../features/PostsCounter/PostsCounterContainer';
import Posts from '../../features/Posts/PostsContainer';

const HomePage = () => (
  <div>
    <PageTitle>Blog</PageTitle>
    <PostsCounter />
    <Posts postsPerPage={3} pagination={false} />
  </div>
);

export default HomePage;
