import { connect } from 'react-redux';
import { getRequest, editPostRequest, getPost, resetRequest, loadPostRequest } from '../../../redux/postsRedux';
import EditPost from './EditPost';
import {withRouter} from 'react-router-dom';


const mapStateToProps = state => ({
  request: getRequest(state),
  singlePost: getPost(state),
})

const mapDispatchToProps = dispatch => ({
  loadPost: id => dispatch(loadPostRequest(id)),
  editPost: (post, id) => dispatch(editPostRequest(post, id)),
  resetRequest: () => dispatch(resetRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));
  