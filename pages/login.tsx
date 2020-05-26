import React, { useCallback, useState } from 'react';
import withAppLayout from '../components/AppLayout/Layout';
import { LoginForm } from '../components/Forms/LoginForm';
import { useRouter } from 'next/router';
import { setCurrentUser } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import withRedux from 'next-redux-wrapper';

// { username: 'test-user', password: 'my-password' }
const Login = () => {
	const [ formData, setFormData ] = useState({ username: '', password: '' });
	const [ error, setError ] = useState({});
	const router = useRouter();
	const dispatch = useDispatch();
	const handleSubmit = useCallback(
		() => {
			axios
				.post('/api/login', formData)
				.then(({ data }) => {
					dispatch(setCurrentUser(data.user));
					router.push('/');
				})
				.catch(() => {
					setFormData({ username: '', password: '' });
					setError({
						header: 'Ошибка входа',
						content: 'Пользователь не найдет, возможно неверно введен логин или пароль'
					});
				});
		},
		[ formData ]
	);

	const handleChange = useCallback(
		(e, { name, value }) => {
			setError({});
			setFormData({ ...formData, [name]: value });
		},
		[ formData ]
	);

	return <LoginForm onSubmit={handleSubmit} onChange={handleChange} formData={formData} error={error} />;
};

export default Login;
