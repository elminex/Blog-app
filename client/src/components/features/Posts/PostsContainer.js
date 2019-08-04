import { connect } from 'react-redux';
import { getPosts, getRequest, getPages, loadPostsByPageRequest, resetRequest } from '../../../redux/postsRedux';
import Posts from './Posts';

const mapStateToProps = state => ({
  posts: getPosts(state),
  request: getRequest(state),
  pages: getPages(state),

})

const mapDispatchToProps = dispatch => ({
  resetRequest: () => dispatch(resetRequest()),
  loadPostsByPage: (page, postsPerPage) => dispatch(loadPostsByPageRequest(page, postsPerPage)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
