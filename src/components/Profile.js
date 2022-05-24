import React, { useEffect, useState } from 'react';
import { api } from '../api';

const Profile = ({ userData, token }) => {
	// const API_URL = `/users/me`;
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setPosts(userData.posts);
	}, [userData]);

	const handleSubmit = async (event, postId) => {
		const API_URL = `/posts/${postId}`;
		event.preventDefault();
		try {
			await api({
				url: API_URL,
				method: 'delete',
				token: token,
			});
			const remainingPosts = posts.filter((post) => post._id !== postId);
			setPosts(remainingPosts);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1 className='page-title'>{userData.username}</h1>
			<div className='profile-body'>
				{userData.messages && userData.messages.length ? (
					<div>
						<div id='inbox-span'>
							<h3 id='inbox'>Inbox ({userData.messages.length})</h3>

							{userData.messages.map((message) => {
								return (
									<div id='message' key={message._id}>
										<label id='sender'>{message.fromUser.username}</label>
										<p id='message-content'>{message.content}</p>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<h3>There are no messages to display</h3>
				)}
				{posts && posts.length ? (
					<div id='user-posts'>
						<h2>Listings you've created: </h2>
						{posts.map((post) => {
							return (
								<div key={post._id} style={{ border: '1px solid black' }}>
									<h5>{post.title}</h5>
									<div>Posted by: {post.author.username}</div>
									<div>Description: {post.description}</div>
									<div>Location: {post.location}</div>
									<button onClick={(e) => handleSubmit(e, post._id)}>
										Delete Post
									</button>
								</div>
							);
						})}
					</div>
				) : (
					<h2>You haven't created any posts yet.</h2>
				)}
			</div>
		</div>
	);
};

export default Profile;
