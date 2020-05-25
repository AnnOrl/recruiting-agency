import React from 'react';
import Link from 'next/link';
import { emailRegExp, Roles } from '../../const';
import { Button, Form, Grid, Header, Container, Message, Segment } from 'semantic-ui-react';

const RegisterForm = ({ formData, onSubmit, onChange, error, success }) => {
	const emailValid = emailRegExp.test(formData.email);
	return (
		<Container text>
			<Header as="h1" dividing>
				Регистрация пользователей
			</Header>

			<p>
				Вы можете зарегистрировать пользователя, для этого введите его имя и почтовый адрес. На этот адрес будет
				отправлены данные для авторизации.
			</p>
			<p>Данные для авторизации можно передать лично.</p>
			<br />
			{error.content && <Message error header={error.header} content={error.content} />}
			{success.content && <Message success header={success.header} content={success.content} />}
			<Grid textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Form size="large" onSubmit={onSubmit}>
						<Segment stacked>
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
								error={formData.email && !emailValid ? 'Неверный формат электронной почты' : null}
								onChange={onChange}
								required
							/>
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
								name="password"
								onChange={onChange}
								required
							/>

							<Form.Dropdown
								fluid
								selection
								label="Роль пользователя"
								options={[
									{ value: Roles.VIEW, text: 'Просмотр' },
									{ value: Roles.EDIT, text: 'Просмотр и редактирование' },
									{ value: Roles.FULL, text: 'Администрирование' }
								]}
								value={formData.role}
								iconPosition="left"
								placeholder="Роль пользователя"
								name="role"
								onChange={onChange}
								required
							/>
							<Button color="teal" fluid size="large" disabled={!formData.name || !formData.email}>
								Зарегистрировать
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export { RegisterForm };
