import React, { useState } from 'react';
import classNames from 'classnames';
import { useAuthState } from '../../context/authContext';
import moment from 'moment';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

const reactions = [
	'❤️',
	'😂',
	'😭',
	'😒',
	'👌',
	'😘',
	'💕',
	'😁',
	'🙈',
	'😡',
	'🥶',
];
const REACT_TO_MESSAGE = gql`
	mutation reactToMessage($_id: String!, $content: String!) {
		reactToMessage(_id: $_id, content: $content) {
			_id
		}
	}
`;
const Message = ({ message }) => {
	const { user } = useAuthState();
	const sent = message.from === user.username;
	const received = !sent;
	const [showPopover, setShowPopover] = useState(false);

	const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
		onCompleted: data => setShowPopover(false),
		onError: err => console.log(err),
	});

	const react = reaction => {
		// console.log(`Reacting ${reaction} to message ${message._id}`);
		reactToMessage({ variables: { _id: message._id, content: reaction } });
	};

	const reactButton = (
		<OverlayTrigger
			trigger='click'
			placement='top'
			show={showPopover}
			onToggle={setShowPopover}
			transition={false}
			rootClose
			overlay={
				<Popover className='rounded-pill'>
					<Popover.Content className='d-flex px-0 py-1 align-items-center react-button-popover'>
						{reactions.map(reaction => (
							<Button
								variant='link'
								className='react-icon-button'
								key={reaction}
								onClick={() => react(reaction)}
							>
								{reaction}
							</Button>
						))}
					</Popover.Content>
				</Popover>
			}
		>
			<Button variant='link' className='px-2'>
				<i className='far fa-smile' />
			</Button>
		</OverlayTrigger>
	);

	return (
		<div
			className={classNames('d-flex my-3', {
				'ml-auto': sent,
				'mr-auto': received,
			})}
		>
			{/* {sent && reactButton} */}
			<OverlayTrigger
				placement={sent ? 'right' : 'left'}
				overlay={
					<Tooltip>
						{moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
					</Tooltip>
				}
			>
				<div
					className={classNames('py-2 px-3 rounded-pill ', {
						'bg-primary': sent,
						receiver: received,
					})}
				>
					<p className={classNames({ 'text-white': sent })}>
						{message.content}
					</p>
				</div>
			</OverlayTrigger>
			{/* {received && reactButton} */}
		</div>
	);
};

export default Message;
