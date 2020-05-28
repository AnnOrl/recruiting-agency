import React, { useCallback, useState, Fragment } from 'react';
import { Button, Header, Divider, Form, Modal } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getCustomers } from '../../actions';
import { FormLayout } from '../Layouts/FormLayout';

const fields = [
	{ Component: Form.Input, name: 'name', label: 'Название компании', params: { required: true } },
	{ Component: Form.TextArea, name: 'mailing_address', label: 'Почтовый адрес', params: { required: true } },
	{ Component: Form.TextArea, name: 'actual_address', label: 'Фактический адрес', params: { required: true } },
	{
		name: 'phoneemail',
		fields: [
			{ Component: Form.Input, name: 'phone', label: 'Телефон', params: { required: true } },
			{ Component: Form.Input, name: 'email', label: 'Электронная почта' }
		]
	},
	{
		name: 'innkpp',
		fields: [
			{ Component: Form.Input, name: 'inn', label: 'ИНН', params: { required: true } },
			{ Component: Form.Input, name: 'kpp', label: 'КПП', params: { required: true } }
		]
	},
	{
		name: 'bankbik',
		fields: [
			{ Component: Form.Input, name: 'bank', label: 'Банк', params: { required: true } },
			{ Component: Form.Input, name: 'bik', label: 'БИК', params: { required: true } }
		]
	},
	{
		name: 'accounts',
		fields: [
			{
				Component: Form.Input,
				name: 'correspondent_account',
				label: 'Корреспондентский счет',
				params: { required: true }
			},
			{ Component: Form.Input, name: 'checking_account', label: 'Расчетный счет', params: { required: true } }
		]
	},
	{ Component: Form.TextArea, name: 'comments', label: 'Примечание' }
];

export const CompanyForm = ({ children, initialFormData = null }) => {
	const dispatch = useDispatch();
	const [ modalOpened, setModalOpened ] = useState(false);
	const toggleModal = useCallback(
		() => {
			setModalOpened(!modalOpened);
		},
		[ modalOpened ]
	);

	const handleSubmit = useCallback(
		(formData) => {
			const action =
				initialFormData && initialFormData.id_customer
					? axios.put('/api/customers/' + initialFormData.id_customer, formData)
					: axios.post('/api/customers', formData);

			return action.then(() => {
				getCustomers(dispatch);
				toggleModal();
			});
		},
		[ toggleModal, initialFormData ]
	);

	return (
		<Modal trigger={<div onClick={toggleModal}>{children}</div>} closeIcon open={modalOpened} onClose={toggleModal}>
			<Modal.Header>{initialFormData ? 'Редактирование компании' : 'Добавление компании'}</Modal.Header>
			<Modal.Content>
				<FormLayout onSubmit={handleSubmit} fields={fields} initialFormData={initialFormData} />
			</Modal.Content>
		</Modal>
	);
};
