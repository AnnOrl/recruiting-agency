import React, { useCallback, useState } from 'react';
import withAppLayout from '../components/AppLayout/Layout';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { useRouter } from 'next/router';
import HttpStatus from 'http-status-codes';

// { username: 'test-user', password: 'my-password' }
const Login = () => {
	const [ formData, setFormData ] = useState({ username: '', password: '' });
	const [ error, setError ] = useState({});
	const router = useRouter();
	const handleSubmit = useCallback(
		() => {
			let xhr = new XMLHttpRequest();
			xhr.open('post', '/api/login');
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.send(JSON.stringify(formData));
			xhr.onload = function() {
				if (xhr.status === HttpStatus.OK) {
					router.push('/');
				} else {
					setFormData({ username: '', password: '' });
					setError({
						header: 'Ошибка входа',
						content: JSON.parse(xhr.response)?.error || HttpStatus.getStatusText(xhr.status)
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

	return <LoginForm onSubmit={handleSubmit} onChange={handleChange} formData={formData} error={error} />;
};

export default withAppLayout()(Login);
