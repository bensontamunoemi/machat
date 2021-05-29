import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Col } from 'react-bootstrap';
import {
	useMessageDispatch,
	useMessageState,
} from '../../context/messageContext';
import Message from './Message';
import { Fragment } from 'react';

const GET_MESSAGES = gql`
	query getMessages($from: String!) {
		getMessages(from: $from) {
			_id
			content
			createdAt
			to
			from
		}
	}
`;
const Messages = () => {
	const { users } = useMessageState();
	const selectedUser = users?.find(u => u.selected === true);
	const messages = selectedUser?.messages;
	const dispatch = useMessageDispatch();
	const [getMessages, { loading: messagesLoading, data: messagesData }] =
		useLazyQuery(GET_MESSAGES);

	useEffect(() => {
		if (selectedUser && !selectedUser.messages) {
			getMessages({ variables: { from: selectedUser.username } });
		}
	}, [selectedUser]);
	useEffect(() => {
		if (messagesData) {
			dispatch({
				type: 'SET_USER_MESSAGES',
				payload: {
					username: selectedUser.username,
					messages: messagesData.getMessages,
				},
			});
		}
	}, [messagesData]);

	let selectedChatMarkup;

	if (!messages && !messagesLoading) {
		selectedChatMarkup = <p>Select a friend</p>;
	} else if (messagesLoading) {
		selectedChatMarkup = <p>Loading...</p>;
	} else if (messages && messages.length > 0) {
		selectedChatMarkup = messages.map((message, index) => (
			<Fragment key={message._id}>
				<Message message={message} />
				{index === message.length - 1 && (
					<div className='invisible'>
						<hr className='m-0' />
					</div>
				)}
			</Fragment>
		));
	} else if (messages.length === 0) {
		selectedChatMarkup = <p>You are now connected! send your first message!</p>;
	}

	return (
		<Col xs={10} md={8} className='messages-box d-flex flex-column-reverse'>
			{selectedChatMarkup}
		</Col>
	);
};

export default Messages;