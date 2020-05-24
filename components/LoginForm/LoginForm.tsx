import React from 'react';
import Link from 'next/link';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const LoginForm = ({ formData, onSubmit, onChange, error, register = false }) => {
	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="teal" textAlign="center">
					<Image src="/logo.png" /> {register ? 'Регистрация' : 'Войдите в ваш аккаунт'}
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

						{register && (
							<>
								<Form.Input
									fluid
									icon="lock"
									value={formData.confirmPassword}
									error={formData.confirmPassword !== formData.password && 'Пароли не совпадают'}
									iconPosition="left"
									placeholder="Подтверждение пароля"
									type="password"
									name="confirmPassword"
									onChange={onChange}
									required
								/>
								<Form.Input
									fluid
									icon="male"
									value={formData.name}
									iconPosition="left"
									placeholder="Имя"
									name="name"
									onChange={onChange}
									required
								/>
								<Form.Input
									fluid
									icon="at"
									value={formData.email}
									iconPosition="left"
									placeholder="Электронная почта"
									name="email"
									onChange={onChange}
									required
								/>
							</>
						)}
						<Button color="teal" fluid size="large" disabled={!formData.username || !formData.password}>
							{!register ? 'Войти' : 'Зарегистрироваться'}
						</Button>
					</Segment>
				</Form>
				{error.content && <Message error header={error.header} content={error.content} />}
				<Message>
					<Link href={!register ? '/register' : '/login'}>
						<a>{!register ? 'Зарегистрируйтесь' : 'Войдите'}</a>
					</Link>{' '}
					для доступа к системе
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export { LoginForm };
