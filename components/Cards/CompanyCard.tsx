import React, { useCallback, useState, Fragment } from 'react';
import { Form, Modal, Table, Icon, Label, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getCustomers } from '../../actions';

const data = {
	header: 'name',
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
	const [ modalOpened, setModalOpened ] = useState(false);
	const dispatch = useDispatch();
	const toggleModal = useCallback(
		() => {
			setModalOpened(!modalOpened);
		},
		[ modalOpened ]
	);
	const handleDelete = useCallback(() => {
		return axios.delete('/api/customers/' + initialFormData.id_customer).then(() => {
			getCustomers(dispatch);
			toggleModal();
		});
	}, []);

	const handlePrint = useCallback(() => {
		window.print();
	}, []);

	return (
		<Modal
			trigger={<div onClick={toggleModal}>{children}</div>}
			closeIcon
			open={modalOpened}
			onClose={toggleModal}
			size="small"
		>
			<Modal.Header>Карточка организации: {initialFormData[data.header]}</Modal.Header>
			<Modal.Content>
				<Table basic="very" celled>
					{data.items.map(({ name, label }) => (
						<Table.Row key={name}>
							<Table.Cell collapsing>
								<Label horizontal>{label}</Label>
							</Table.Cell>
							<Table.Cell> {initialFormData[name]}</Table.Cell>
						</Table.Row>
					))}
				</Table>
			</Modal.Content>
			<Modal.Actions>
				<Button labelPosition="right" icon onClick={handleDelete} color="red">
					<Icon name="delete" />
					Удалить организацию
				</Button>
				<Button labelPosition="right" icon onClick={handlePrint}>
					<Icon name="print" />
					Печать
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
