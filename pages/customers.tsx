import React, { useCallback, useState, useEffect } from 'react';
import { Icon, Pagination, Button, Table, Container, Popup } from 'semantic-ui-react';
import dataLayout from '../components/Layouts/DataLayout';
import { CompanyForm } from '../components/Forms/CompanyForm';
import { ContactsForm } from '../components/Forms/ContactsForm';
import { CompanyCard } from '../components/Cards/CompanyCard';
import { getCustomers } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Roles } from '../const';

const headers = [
	{ id: 'name', name: 'Компания' },
	{ id: 'comments', name: 'Примечание' },
	{ id: 'actions', name: '', collapsing: true }
];

const Customers = () => {
	const { customers, user } = useSelector((store) => store);
	const dispatch = useDispatch();
	const [ page, setPage ] = useState(1);
	useEffect(
		() => {
			if (customers.page !== page) {
				getCustomers(dispatch, null, { page });
			}
		},
		[ page ]
	);

	const handlePaginationChange = useCallback((e, { activePage }) => setPage(activePage), []);

	return (
		<Container>
			<Table celled sortable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan="3">
							<CompanyForm>
								<Button floated="right" icon labelPosition="left" primary size="small">
									<Icon name="user" /> Добавить организацию
								</Button>
							</CompanyForm>
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						{headers.map(({ id, name, ...params }) => {
							return (
								<Table.HeaderCell key={id} {...params}>
									{name}
								</Table.HeaderCell>
							);
						})}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{customers &&
						customers.data &&
						customers.data.map((customer) => {
							const { id_customer, name, comments } = customer;
							return (
								<Table.Row key={id_customer}>
									<Table.Cell>{name}</Table.Cell>
									<Table.Cell>{comments}</Table.Cell>
									<Table.Cell>
										<div style={{ display: 'flex' }}>
											<CompanyCard initialFormData={customer}>
												<Popup
													content={'Карточка организации'}
													trigger={<Button circular icon="address card outline" />}
												/>
											</CompanyCard>
											<ContactsForm customer={customer}>
												<Popup
													content={'Контакты'}
													trigger={<Button circular icon="address book" />}
												/>
											</ContactsForm>
											<Popup
												content={'Вакансии'}
												trigger={<Button circular icon="list alternate outline" />}
											/>

											{user.role === Roles.FULL && (
												<CompanyForm initialFormData={customer}>
													<Popup
														content={'Редактирование'}
														trigger={<Button circular icon="edit" />}
													/>
												</CompanyForm>
											)}
										</div>
									</Table.Cell>
								</Table.Row>
							);
						})}
				</Table.Body>

				{customers.countPages > 1 && (
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan="3" textAlign="center">
								<Pagination
									activePage={page}
									totalPages={customers.countPages}
									onPageChange={handlePaginationChange}
								/>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				)}
			</Table>
			<br />
		</Container>
	);
};

Customers.actions = [ getCustomers ];
export default dataLayout()(Customers);
