import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Header } from '../Header/Header';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from '../../redux/actions';
import { Loader, Segment } from 'semantic-ui-react';
import { getUser } from '../../actions';

const dataLayout = () => (ComposedComponent) => {
	const AppLayout = (props) => {
		const { pathname } = useRouter();
		const [ loading, setLoading ] = useState(true);
		const store = useSelector((store) => store);
		const dispatch = useDispatch();
		useEffect(() => {
			Promise.all([
				getUser(dispatch, store),
				...(ComposedComponent.actions ? ComposedComponent.actions.map((action) => action(dispatch, store)) : [])
			]).then(() => {
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

export default dataLayout;
