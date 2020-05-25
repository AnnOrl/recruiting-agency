import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const LoginForm = ({ formData, onSubmit, onChange, error }) => {
	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="teal" textAlign="center">
					<Image src="/logo.png" /> Войдите в ваш аккаунт
				</Header>
				<Form size="large" onSubmit={onSubmit}>
					<Segment stacked>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Логин"
							value={formData.username}
							required
							name="username"
							onChange={onChange}
						/>
						<Form.Input
							fluid
							icon="lock"
							value={formData.password}
							iconPosition="left"
							placeholder="Пароль"
							type="password"
							name="password"
							onChange={onChange}
							required
						/>

						<Button color="teal" fluid size="large" disabled={!formData.username || !formData.password}>
							Войти
						</Button>
					</Segment>
				</Form>
				{error.content && <Message error header={error.header} content={error.content} />}
			</Grid.Column>
		</Grid>
	);
};

export { LoginForm };
