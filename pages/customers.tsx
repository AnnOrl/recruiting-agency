import React, { useCallback, useState, useEffect } from 'react';
import { Icon, Pagination, Button, Table, Container, Popup } from 'semantic-ui-react';
import dataLayout from '../components/Layouts/DataLayout';
import { CompanyForm } from '../components/Forms/CompanyForm';
import { ContactsForm } from '../components/Forms/ContactsForm';
import { CompanyCard } from '../components/Cards/CompanyCard';
import { TableComponent } from '../components/TableComponent';
import { getCustomers } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Roles } from '../const';

const headers = [
	{
		id: 'name',
		name: 'Компания',
		filterName: 'customers.name'
	},
	{ id: 'comments', name: 'Примечание', filterName: 'customers.comments' },
	{ id: 'actions', name: '', collapsing: true }
];

const Customers = () => {
	const { customers, user } = useSelector((store) => store);

	return (
		<TableComponent
			data={customers}
			onUpdateData={getCustomers}
			headers={headers}
			idItem="id_customer"
			actionAdd={
				<CompanyForm>
					<Button floated="right" icon labelPosition="left" primary size="small">
						<Icon name="user" /> Добавить организацию
					</Button>
				</CompanyForm>
			}
			renderActionItem={(item) => (
				<div style={{ display: 'flex' }}>
					<CompanyCard initialFormData={item}>
						<Popup
							content={'Карточка организации'}
							trigger={<Button circular icon="address card outline" />}
						/>
					</CompanyCard>
					<ContactsForm customer={item}>
						<Popup content={'Контакты'} trigger={<Button circular icon="address book" />} />
					</ContactsForm>

					<Popup
						content={'Вакансии'}
						trigger={
							<Link
								href={{
									pathname: '/jobs',
									query: { filter: JSON.stringify({ 'customers.name': item.name }) }
								}}
							>
								<Button circular icon="list alternate outline" />
							</Link>
						}
					/>

					{user.role === Roles.FULL && (
						<CompanyForm initialFormData={item}>
							<Popup content={'Редактирование'} trigger={<Button circular icon="edit" />} />
						</CompanyForm>
					)}
				</div>
			)}
		/>
	);
};

Customers.actions = [ getCustomers ];
export default dataLayout()(Customers);
