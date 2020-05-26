import React from 'react';
import App, { AppInitialProps } from 'next/app';
import { wrapper } from '../redux/store';
import Head from 'next/head';

class WrappedApp extends App<AppInitialProps> {
	public render() {
		const { Component, pageProps } = this.props;
		return (
			<div>
				<Head>
					<title>Подбор персонала</title>
					<link rel="icon" href="/icon.ico" />
					<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
					<link rel="stylesheet" href="/styles.css" />
				</Head>
				<div className="body">
					<Component {...pageProps} />
				</div>
			</div>
		);
	}
}

export default wrapper.withRedux(WrappedApp);
