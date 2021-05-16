import React, { useState, Fragment } from 'react';
import { Row, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch } from '../../context/authContext';
import Users from './Users';
import Messages from './Messages';

const Home = ({ history }) => {
	const dispatch = useAuthDispatch();
	const [selectedUser, setSelectedUser] = useState(null);

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		history.push('/login');
	};

	return (
		// <Row className='bg-white justify-content-around'>
		// 	<Link to='/login'>
		// 		<Button variant='link'>Login</Button>
		// 	</Link>
		// 	<Link to='/register'>
		// 		<Button variant='link'>Register</Button>
		// 	</Link>
		// 	<Button variant='link' onClick={logout}>
		// 		Logout
		// 	</Button>
		// </Row>
		<Fragment>
			<Navbar bg='light' expand='lg' className='mb-3'>
				<Navbar.Brand href='#home'>MaChat</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
					<Nav>
						<Nav.Link onClick={logout}>Logout</Nav.Link>
					</Nav>
					{/* <Form inline>
					<FormControl type='text' placeholder='Search' className='mr-sm-2' />
					<Button variant='outline-success'>Search</Button>
				</Form> */}
				</Navbar.Collapse>
			</Navbar>
			<Row className=' m-0'>
				<Users setSelectedUser={setSelectedUser} />
				<Messages selectedUser={selectedUser} />
			</Row>
		</Fragment>
	);
};

export default Home;
