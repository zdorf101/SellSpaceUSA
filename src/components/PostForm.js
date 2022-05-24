import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { api } from '../api';

const PostForm = ({ token, setPosts, posts, action }) => {
	const history = useHistory();
	const { postId } = useParams();
	const [newPostData, setNewPostData] = useState({
		title: '',
		description: '',
		price: '',
		location: '',
		willDeliver: false,
	});
	const edit = action === 'edit';
	const title = edit ? 'Edit This Post' : 'Add a New Post';
	const method = edit ? 'PATCH' : 'POST';
	const API_URL = edit ? `/posts/${postId}` : `/posts`;

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const {
				data: { post },
			} = await api({
				url: API_URL,
				method: method,
				body: {
					post: {
						title: newPostData.title,
						description: newPostData.description,
						price: newPostData.price,
						location: newPostData.location,
						willDeliver: newPostData.willDeliver,
					},
				},
				token,
			});

			if (edit) {
				const filteredPosts = posts.filter((post) => post._id !== postId);
				setPosts([...filteredPosts, post]);
			} else {
				setPosts([...posts, post]);
			}
			history.push('/posts');
		} catch (error) {
			console.error('Error adding your post:', error);
		}
	};

	const handleChange = (property) => (event) => {
		if (property === 'willDeliver') {
			setNewPostData({ ...newPostData, [property]: event.target.checked });
		} else {
			setNewPostData({ ...newPostData, [property]: event.target.value });
		}
	};

	return (
		<>
			<h2>{title}</h2>
			<form id='new-post-form' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='What are you selling?'
					onChange={handleChange('title')}
					value={newPostData.title}
				></input>
				<input
					type='text'
					placeholder='Describe the item (i.e. condition, model)'
					onChange={handleChange('description')}
					value={newPostData.description}
				></input>
				<input
					type='text'
					placeholder="What's the price?"
					onChange={handleChange('price')}
					value={newPostData.price}
				></input>
				<input
					type='text'
					placeholder='Where is the item located?'
					onChange={handleChange('location')}
					value={newPostData.location}
				></input>
				<label>
					Are you willing to deliver?
					<input
						type='checkbox'
						onChange={handleChange('willDeliver')}
						value={newPostData.willDeliver}
					></input>
				</label>

				<button style={{ width: '50%' }}>{title}</button>
			</form>
		</>
	);
};

export default PostForm;
