import React, { useCallback, useState, useMemo, Fragment } from 'react';
import { Button, Popup, Table, Icon, Modal } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getCustomers } from '../../actions';
import { FormLayout } from '../Layouts/FormLayout';
import { ModalContactsForm } from './ModalContactsForm';

const fields = [
	{ name: 'name', label: 'Контактное лицо' },
	{ name: 'phone', label: 'Телефон' },
	{ name: 'email', label: 'Электронная почта' },
	{ name: 'action', label: '', collapsing: true, className: 'table-actions' }
];

export const ContactsForm = ({ children, customer }) => {
	const dispatch = useDispatch();
	const [ modalOpened, setModalOpened ] = useState(false);
	const toggleModal = useCallback(
		() => {
			setModalOpened(!modalOpened);
		},
		[ modalOpened ]
	);

	const handleDelete = useMemo(
		() => (id_customer_representatives) => () => {
			return axios.delete('/api/customers/representatives/' + id_customer_representatives).then(() => {
				getCustomers(dispatch);
				toggleModal();
			});
		},
		[]
	);

	const handlePrint = useCallback(() => {
		window.print();
	}, []);

	return (
		<Modal
			trigger={<div onClick={toggleModal}>{children}</div>}
			closeIcon
			open={modalOpened}
			onClose={toggleModal}
			className="contact-modal"
		>
			<Modal.Header>Контакты организации: {customer.name}</Modal.Header>
			<Modal.Content>
				{customer.customerRepresentatives && customer.customerRepresentatives.length ? (
					<Table celled>
						<Table.Header>
							<Table.Row>
								{fields.map(({ name, label, ...params }) => {
									return (
										<Table.HeaderCell key={name} {...params}>
											{label}
										</Table.HeaderCell>
									);
								})}
							</Table.Row>
						</Table.Header>
						{customer.customerRepresentatives.map((customerRepresentative) => {
							const { id_customer_representatives, name, phone, email } = customerRepresentative;
							return (
								<Table.Row key={id_customer_representatives}>
									<Table.Cell>{name}</Table.Cell>
									<Table.Cell>{phone}</Table.Cell>
									<Table.Cell>{email}</Table.Cell>
									<Table.Cell className="table-actions">
										<div className="flexable">
											<ModalContactsForm initialFormData={customerRepresentative}>
												<Popup
													content={'Редактирование'}
													trigger={<Button circular icon="edit" />}
												/>
											</ModalContactsForm>
											<Popup
												content={'Удалить'}
												trigger={
													<Button
														circular
														color="red"
														icon="delete"
														onClick={handleDelete(id_customer_representatives)}
													/>
												}
											/>
										</div>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table>
				) : (
					'Контактных лиц не найдено'
				)}
			</Modal.Content>
			<Modal.Actions>
				<Button labelPosition="right" icon onClick={handlePrint}>
					Печать
					<Icon name="print" />
				</Button>
				<ModalContactsForm
					initialFormData={{ id_customer: customer.id_customer }}
					trigger={{
						labelPosition: 'right',
						icon: true,
						color: 'blue',
						content: (
							<Fragment>
								Добавить
								<Icon name="add user" />
							</Fragment>
						)
					}}
				/>
			</Modal.Actions>
		</Modal>
	);
};
