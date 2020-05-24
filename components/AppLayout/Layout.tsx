import React, { Component } from 'react';
import Head from 'next/head';
import { Header } from '../Header/Header';

const withAppLayout = () => (ComposedComponent) => {
	class AppLayout extends Component {
		render() {
			return (
				<div>
					<Head>
						<title>Подбор персонала</title>
						<link rel="stylesheet" href="/index.css" />
						<link rel="icon" href="/icon.ico" />
						<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
					</Head>
					<Header />
					<ComposedComponent {...this.props} />
				</div>
			);
		}
	}

	return AppLayout;
};

export default withAppLayout;
