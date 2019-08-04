import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Contact from './components/pages/Contact/Contact';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import PostsPage from './components/pages/PostsPage/PostsPage';
import AddPost from './components/pages/AddPost/AddPost';
import EditPost from './components/pages/EditPost/EditPostContainer';
import Post from './components/pages/Post/PostContainer';
import RandomPost from './components/pages/RandomPost/RandomPostContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  render() {
    return (
      <MainLayout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/posts' exact component={PostsPage} />
          <Route path='/posts/new' exact component={AddPost} />
          <Route path='/posts/edit/:id' component={EditPost} />
          <Route path='/posts/random' component={RandomPost} />
          <Route path='/posts/:id' component={Post} />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    );
  }
};


export default App;
