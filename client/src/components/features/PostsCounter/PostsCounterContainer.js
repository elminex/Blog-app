import { connect } from 'react-redux';
import { getPostsCount } from '../../../redux/postsRedux';
import PostsCounter from './PostsCounter';

const mapStateToProps = state => ({
  count: getPostsCount(state),
})

export default connect(mapStateToProps)(PostsCounter);
