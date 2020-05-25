import React, { useCallback, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import HttpStatus from 'http-status-codes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Roles } from '../../const';
import { useSelector, useDispatch } from 'react-redux';

const menu = [
	{ link: '/', name: 'В работе' },
	{ link: '/meetings', name: 'Встречи' },
	{ link: '/calendar', name: 'Календарь' },
	{ link: '/seekers', name: 'Соискатели' },
	{ link: '/jobs', name: 'Вакансии' },
	{ link: '/customers', name: 'Клиенты', role: Roles.FULL },
	{ link: '/register', name: 'Регистрация пользователей', role: Roles.FULL }
];

const Header = () => {
	const router = useRouter();
	const user = useSelector((state) => state.user) || {};

	const handleLogout = useCallback(() => {
		axios.get('/api/logout').then(() => {
			router.push('/login');
		});
	}, []);

	return (
		<Menu stackable>
			<Link href="/">
				<Menu.Item>
					<img src="/logo.png" />
				</Menu.Item>
			</Link>

			{menu.map(({ link, name, role }) => {
				return !role || !user.role || role === user.role ? (
					<Link href={link} key={link}>
						<Menu.Item active={router.pathname === link}>{name}</Menu.Item>
					</Link>
				) : null;
			})}

			<Menu.Menu position="right">
				<Menu.Item name="sign-in" onClick={handleLogout}>
					Выйти
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export { Header };
