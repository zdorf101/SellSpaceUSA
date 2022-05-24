import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { api } from '../api';

const method = 'DELETE';

const postMatches = (post, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  const {
    description,
    location,
    title,
    author: { username },
  } = post;

  const toMatch = [description, location, title, username];

  for (let i = 0; i < toMatch.length; i++) {
    const field = toMatch[i];
    if (field.toLowerCase().includes(searchTermLower)) {
      return true;
    }
  }
};

const Posts = ({ posts, token, setPosts, userData }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const postsToDisplay = posts.filter((post) => postMatches(post, searchTerm));

  const handleSubmit = async (event, postId) => {
    const API_URL = `/posts/${postId}`;
    event.preventDefault();
    try {
      await api({
        url: API_URL,
        method: method,
        token: token,
      });
      const remainingPosts = posts.filter((post) => post._id !== postId);
      setPosts(remainingPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id='posts-nav'>
        <h2 className='page-title'>Posts</h2>
        <input
          type='text'
          placeholder='Search Posts'
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
      </div>
      {postsToDisplay.length ? (
        postsToDisplay.map((post) => (
          <div
            className='post-info'
            key={post._id}
            style={{
              border: '2px solid blue',
              padding: '30px',
              textAlign: 'center',
            }}
          >
            <div id='title-button'>
              <span className='post-title' style={{ textAlign: 'center' }}>
                {post.title}
              </span>
              <button onClick={() => history.push(`/posts/${post._id}`)}>
                More Info!
              </button>
            </div>
            <div id='seller'>Seller: {post.author.username}</div>
            <div className='location'>Location: {post.location}</div>
            <div className='description'>Description: {post.description}</div>

            {post.author.username === userData.username ? (
              <button onClick={() => handleSubmit(post._id)}>
                Delete Post
              </button>
            ) : null}
          </div>
        ))
      ) : (
        <div>
          <h1>There are no matching posts...</h1>
        </div>
      )}
    </>
  );
};

export default Posts;
