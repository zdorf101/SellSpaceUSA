import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { api } from './api';
import {
  Register,
  Nav,
  PostForm,
  Posts,
  Profile,
  Post,
  Login,
} from './components';
import './style.css';

const App = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchUserData = async (token) => {
    const { data } = await api({
      url: '/users/me',
      token,
    });
    return data;
  };

  const fetchPosts = async () => {
    const {
      data: { posts },
    } = await api({
      url: '/posts',
    });
    return posts;
  };

  useEffect(async () => {
    // const posts = await fetchPosts();
    // setPosts(posts);
    if (!token) {
      setToken(localStorage.getItem('token'));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);

  useEffect(async () => {
    const posts = await fetchPosts();
    setPosts(posts);
  }, []);

  return (
    <>
      <div id='header'>
        {userData.username && <p id='header'>Welcome {userData.username}</p>}
        {!userData.username && (
          <p>
            {' '}
            <span id='header'>SellSpaceUSA</span>
          </p>
        )}
      </div>
      <Nav token={token} />

      <Switch>
        <Route exact path='/'></Route>

        <Route exact path='/posts'>
          <Posts
            posts={posts}
            token={token}
            setPosts={setPosts}
            userData={userData}
          />
        </Route>
        <Route path='/profile'>
          <Profile userData={userData} token={token} />
        </Route>
        <Route path='/posts/new'>
          <PostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action='add'
          />
        </Route>
        <Route path='/posts/:postId/edit'>
          <PostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action='edit'
          />
        </Route>
        <Route path='/posts/:postId'>
          <Post posts={posts} token={token} />
        </Route>
        <Route path='/register'>
          <Register
            action='register'
            setToken={setToken}
            setUserData={setUserData}
          />
        </Route>
        <Route path='/login'>
          <Register
            action='login'
            setToken={setToken}
            setUserData={setUserData}
          />
        </Route>
      </Switch>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
