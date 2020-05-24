import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => {
	return (
		<Menu stackable>
			<Menu.Item>
				<img src="/logo.png" />
			</Menu.Item>

			<Menu.Item name="features">Features</Menu.Item>

			<Menu.Item name="testimonials">Testimonials</Menu.Item>

			<Menu.Item name="sign-in">Sign-in</Menu.Item>
		</Menu>
	);
};

export { Header };
