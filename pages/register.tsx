import React, { useCallback, useState } from 'react';
import withAppLayout from '../components/AppLayout/Layout';
import { RegisterForm } from '../components/LoginForm/RegisterForm';
import { useRouter } from 'next/router';
import axios from 'axios';

const gen_password = () => {
	return Math.random().toString(36).slice(1);
};

const Register = () => {
	const [ formData, setFormData ] = useState({
		username: '',
		password: '',
		email: '',
		name: '',
		role: 1
	});
	const [ error, setError ] = useState({});
	const [ success, setSuccess ] = useState({});
	const router = useRouter();
	const handleSubmit = useCallback(
		() => {
			axios
				.post('/api/users', formData)
				.then(({data}) => {
					setSuccess({
						header: 'Пользователь создан',
						content: <div>
							<p>Логин: {data.login}</p>
							<p>Пароль: {formData.password}</p>
						</div>,
					})
					setFormData({ username: '', password: '', email: '', name: '', role: 1 });
				})
				.catch(({ response }) => {
					setFormData({ username: '', password: '', email: '', name: '', role: 1 });
					setError({
						header: 'Ошибка регистрации',
						content:
						response?.data?.error?.code === 'ER_DUP_ENTRY'
								? 'Пользователь с таким логином существует'
								: 'При регистрации произошла ошибка, попробуйте позднее'
					});
				});
		},
		[ formData ]
	);

	const handleChange = useCallback(
		(e, { name, value }) => {
			setError({});
			const newFormData = { ...formData, [name]: value };

			if (name === 'email') {
				newFormData.username = value.split('@')[0];
				newFormData.password = newFormData.password || gen_password();
			}
			setFormData(newFormData);
		},
		[ formData ]
	);

	return <RegisterForm onSubmit={handleSubmit} onChange={handleChange} formData={formData} error={error} success={success}/>;
};

export default withAppLayout()(Register);
