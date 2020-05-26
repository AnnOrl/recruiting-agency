import React, { useCallback, useState, Fragment } from 'react';
import { Button, Header, Divider, Form, Modal } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getCustomers } from '../../actions';
import { FormLayout } from './FormLayout';

const fields = [
	{ Component: Form.Input, name: 'name', label: 'Контактное лицо', params: { required: true } },
	{
		name: 'contacts',
		fields: [
			{ Component: Form.Input, name: 'phone', label: 'Телефон', params: { required: true } },
			{ Component: Form.Input, name: 'email', label: 'Электронная почта' }
		]
	}
];

export const ModalContactsForm = ({ children = null, initialFormData, trigger = null }) => {
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
				initialFormData && initialFormData.id_customer_representatives
					? axios.put(
							'/api/customers/representatives/' + initialFormData.id_customer_representatives,
							formData
						)
					: axios.post('/api/customers/' + initialFormData.id_customer + '/representatives', formData);

			return action.then(() => {
				getCustomers(dispatch);
				toggleModal();
			});
		},
		[ toggleModal, initialFormData ]
	);

	return (
		<Modal
			trigger={
				trigger ? (
					<Button onClick={toggleModal} {...trigger}>
						{trigger.content}
					</Button>
				) : (
					<div onClick={toggleModal}>{children}</div>
				)
			}
			closeIcon
			open={modalOpened}
			onClose={toggleModal}
			size="tiny"
		>
			<Modal.Header>
				{initialFormData.id_customer_representatives ? (
					'Редактирование контактного лици'
				) : (
					'Добавление контактного лица'
				)}
			</Modal.Header>
			<Modal.Content>
				<FormLayout onSubmit={handleSubmit} fields={fields} initialFormData={initialFormData} />
			</Modal.Content>
		</Modal>
	);
};
