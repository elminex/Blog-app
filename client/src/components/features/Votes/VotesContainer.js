import { connect } from 'react-redux';
import { getRequest, getPost, resetRequest, editAndLoadVotesRequest } from '../../../redux/postsRedux';
import Votes from './Votes';

const mapStateToProps = state => ({
  singlePost: getPost(state),
  request: getRequest(state),
})

const mapDispatchToProps = dispatch => ({
  editAndLoadVotes: (id, vote) => dispatch(editAndLoadVotesRequest(id, vote)),
  resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Votes);
  