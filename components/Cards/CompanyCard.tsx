import React, { useCallback, useState, Fragment } from 'react';
import { Form, Modal, Table, Icon, Label, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getCustomers } from '../../actions';
import { CardLayout } from '../Layouts/CardLayout';

const data = {
	header: { name: 'name', headerRender: (value) => `Карточка организации: ${value}` },
	items: [
		{ name: 'mailing_address', label: 'Почтовый адрес' },
		{ name: 'actual_address', label: 'Фактический адрес' },
		{ name: 'phone', label: 'Телефон' },
		{ name: 'email', label: 'Электронная почта' },
		{ name: 'inn', label: 'ИНН' },
		{ name: 'kpp', label: 'КПП' },
		{ name: 'bank', label: 'Банк' },
		{ name: 'bik', label: 'БИК' },
		{
			name: 'correspondent_account',
			label: 'Корреспондентский счет'
		},
		{ name: 'checking_account', label: 'Расчетный счет' },
		{ name: 'comments', label: 'Примечание' }
	]
};

export const CompanyCard = ({ children, initialFormData }) => {
	const handleDelete = useCallback(() => {
		return axios.delete('/api/customers/' + initialFormData.id_customer);
	}, []);

	return (
		<CardLayout initialFormData={initialFormData} model={data} onDelete={handleDelete}>
			{children}
		</CardLayout>
	);
};
