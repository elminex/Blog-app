import React from 'react';
import TextField from '../../common/TextField/TextField';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Button from '../../common/Button/Button';
import Editor from 'react-medium-editor';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './PostForm.scss';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        author: '',
        content: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditor = this.handleEditor.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  componentDidMount() {
    if (this.props.editMode) {
      this.setState({
        post: {
          title: this.props.singlePost.title,
          author: this.props.singlePost.author,
          content: this.props.singlePost.content,
        }
      })
    }
  }

componentWillUnmount() {
  const { resetRequest } = this.props;
  resetRequest();
}

handleChange(e) {
  const { post } = this.state;
  this.setState({ post: { ...post, [e.target.name]: e.target.value } });
}

handleEditor(text) {
  const { post } = this.state;
  this.setState({ post: { ...post, content: text } });
}

addPost(e) {
  const { post } = this.state;
  const { addPost, editPost, editMode, id } = this.props;
  e.preventDefault();
  editMode ? editPost(post, id) : addPost(post);
}

render() {
  const { post } = this.state;
  const { request, editMode } = this.props;
  let pageContent;
  switch (true) {
    case (request.success):
      pageContent = <Alert variant="success">Post has been added!</Alert>;
      break;
    case (request.error):
      pageContent = <Alert variant="error">{request.error}</Alert>;
      break;
    case (request.pending):
      pageContent = <Spinner />
      break;
    default:
      pageContent = (
        <form onSubmit={this.addPost}>
          <TextField
            value={post.title}
            label='Title'
            onChange={this.handleChange}
            name='title'
          />
          <TextField
            value={post.author}
            label='Author'
            onChange={this.handleChange}
            name='author'
          />
          <SectionTitle>Post content</SectionTitle>
          <Editor
            className="content-editor"
            tag="pre"
            text={post.content}
            onChange={this.handleEditor}
            options={{ placeholder: false, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'] } }}
          />

          {editMode ? <Button variant="primary">Edit post</Button> : <Button variant="primary">Add Post</Button>}
        </form>
      )
  }
  return pageContent;
}
}

export default PostForm;
