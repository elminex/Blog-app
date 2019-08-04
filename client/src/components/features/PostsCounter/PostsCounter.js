import React from 'react';

class PostsCounter extends React.Component {

  render() {
    const { count } = this.props;
    let number;
    if (count === 0) {
      number = 'No posts';
    } else {
      number = count;
    }
    return (
      <div>Posts count: {number}</div>
    );
  }

};

export default PostsCounter;