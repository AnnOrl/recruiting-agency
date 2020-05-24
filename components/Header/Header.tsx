import React, { useCallback } from 'react';
import { Menu } from 'semantic-ui-react';
import HttpStatus from 'http-status-codes';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();
	const onClick = useCallback(() => {
		let xhr = new XMLHttpRequest();
		xhr.open('get', '/api/logout');
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send();

		xhr.onload = () => {
			if (xhr.status === HttpStatus.OK) {
				router.push('/login');
			}
		};
	}, []);
	return (
		<Menu stackable>
			<Menu.Item>
				<img src="/logo.png" />
			</Menu.Item>

			<Menu.Item name="features">В работе</Menu.Item>

			<Menu.Item name="testimonials">Календарь</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item name="sign-in" onClick={onClick}>
					Выйти
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export { Header };
