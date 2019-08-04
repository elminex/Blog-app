import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getPost, getRequest, loadPostRequest, resetRequest } from '../../../redux/postsRedux';
import Post from './Post';

const mapStateToProps = state => ({
  singlePost: getPost(state),
  request: getRequest(state),
})

const mapDispatchToProps = dispatch => ({
  loadPost: (id) => dispatch(loadPostRequest(id)),
  resetRequest: () => dispatch(resetRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
