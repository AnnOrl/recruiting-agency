import React, { Component } from 'react';
import Head from 'next/head';
import { Header } from '../Header/Header';
import { useRouter } from 'next/router';

const withAppLayout = () => (ComposedComponent) => {
	const AppLayout = (props) => {
		const { pathname } = useRouter();

		return (
			<div>
				<Head>
					<title>Подбор персонала</title>
					<link rel="stylesheet" href="/index.css" />
					<link rel="icon" href="/icon.ico" />
					<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
				</Head>
				{pathname !== '/login' && pathname !== '/register' && <Header />}
				<ComposedComponent {...props} />
			</div>
		);
	};

	return AppLayout;
};

export default withAppLayout;
