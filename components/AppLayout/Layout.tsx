import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../Header/Header';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from '../../redux/actions';
import { Loader, Segment } from 'semantic-ui-react';

const withAppLayout = () => (ComposedComponent) => {
	const AppLayout = (props) => {
		const { pathname } = useRouter();
		const [ loading, setLoading ] = useState(true);
		const { user } = useSelector((store) => store);
		const dispatch = useDispatch();

		const getUser = useCallback(
			() =>
				!user
					? axios.get('/api/users-current').then(({ data }) => dispatch(setCurrentUser(data.user)))
					: Promise.resolve(),
			[]
		);

		useEffect(() => {
			Promise.all([ getUser() ]).then(() => {
				setLoading(false);
			});
		}, []);

		if (loading) {
			return <Loader />;
		}

		return (
			<div>
				{pathname !== '/login' && <Header />}
				<br />
				<ComposedComponent {...props} />
			</div>
		);
	};

	return AppLayout;
};

export default withAppLayout;
