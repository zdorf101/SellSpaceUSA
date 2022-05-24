import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';

const Post = ({ posts, token }) => {
	const { postId } = useParams();
	const post = posts.find((post) => postId === post._id);
	const [content, setContent] = useState('');

	const handleMessage = async () => {
		const API_URL = `/posts/${postId}/messages`;
		console.log('postId' + postId);
		event.preventDefault();
		try {
			await api({
				url: API_URL,
				method: 'post',
				token: token,
				body: {
					message: {
						content: content,
					},
				},
			});
			console.log('DONE!');
		} catch (error) {
			console.error('Error sending a message');
		}
	};
	return (
		<div id='post'>
			{post ? (
				<div className='post-info'>
					<h3 className='post-title'>{post.title}</h3>
					<button>Message Seller</button>
					<p id='seller'>Seller: {post.author.username}</p>
					<p className='location'>Location: {post.location}</p>
					<p className='description'>Price: {post.price}</p>
					<p>Delivers: {post.willDeliver ? 'Yes' : 'No'}</p>
					<Link to='/posts/{post._id}/edit'>Edit This Post</Link>
				</div>
			) : (
				''
			)}
			<form id='message-form' onSubmit={handleMessage}>
				<input
					type='text'
					placeholder='Type your message...'
					onChange={(event) => {
						setContent(event.target.value);
					}}
					value={content}
				></input>
				<button onClick={handleMessage}>Send Message</button>
			</form>
		</div>
	);
};

export default Post;
