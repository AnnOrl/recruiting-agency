import React, { useCallback, useState } from 'react';
import withAppLayout from '../components/AppLayout/Layout';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { useRouter } from 'next/router';
import HttpStatus from 'http-status-codes';

const Register = () => {
	const [ formData, setFormData ] = useState({
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
		name: ''
	});
	const [ error, setError ] = useState({});
	const router = useRouter();
	const handleSubmit = useCallback(
		() => {
			let xhr = new XMLHttpRequest();
			xhr.open('post', '/api/users');
			xhr.setRequestHeader('Content-type', 'application/json');
			const { confirmPassword, ...data } = formData;
			xhr.send(JSON.stringify(data));
			xhr.onload = function() {
				if (xhr.status === HttpStatus.OK) {
					router.push('/login');
				} else {
					setFormData({ username: '', password: '', confirmPassword: '', email: '', name: '' });
					setError({
						header: 'Ошибка регистрации',
						content: JSON.parse(xhr.response).error || HttpStatus.getStatusText(xhr.status)
					});
				}
			};
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

	return <LoginForm onSubmit={handleSubmit} onChange={handleChange} formData={formData} error={error} register />;
};

export default withAppLayout()(Register);
