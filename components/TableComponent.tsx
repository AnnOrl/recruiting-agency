import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Pagination, Table, Container } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

enum SortDirection {
	ASC = 'ASC',
	DESC = 'DESC'
}

enum SortDirectionSemantic {
	ASC = 'ascending',
	DESC = 'descending'
}

interface Query {
	page?: number;
	sortColumn?: string;
	filter?: string;
	sortDirection?: SortDirection;
}

const TableComponent = ({
	data,
	onUpdateData,
	headers,
	idItem,
	actionAdd = null,
	renderActionItem = (item) => null,
	getRowProps = (item) => ({})
}: any) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const query: Query = router.query;
	const [ page, setPage ] = useState(query.page || '1');
	const [ filter, setFilter ] = useState(query.filter ? JSON.parse(query.filter) : {});
	const [ sort, setSort ] = useState<{ sortColumn: string; sortDirection: SortDirection }>({
		sortColumn: query.sortColumn || data.sort.sortColumn,
		sortDirection: query.sortDirection || data.sort.sortDirection
	});

	useEffect(
		() => {
			if (
				data.page !== page ||
				data.sort.sortColumn !== sort.sortColumn ||
				data.sort.sortDirection !== sort.sortDirection ||
				!isEqual(data.filter, filter)
			) {
				onUpdateData(dispatch, null, { page, ...sort, filter });
				router.replace({
					pathname: router.pathname,
					query: { ...router.query, page, ...sort, filter: JSON.stringify(filter) }
				});
			}
		},
		[ page, sort, filter ]
	);

	const handlePaginationChange = useCallback((e, { activePage }) => setPage(activePage), []);

	const handleSort = useMemo(
		() => (id) => () => {
			setSort({
				sortColumn: id,
				sortDirection: sort.sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
			});
		},
		[ sort ]
	);
	const handleFilterChande = useCallback(
		(e, { name, value }) => {
			setFilter(
				value === ''
					? Object.keys(filter).reduce(
							(acc, filterName) =>
								name === filterName ? acc : { ...acc, [filterName]: filter[filterName] },
							{}
						)
					: { ...filter, [name]: value }
			);
		},
		[ filter ]
	);

	const handleClearFilter = useMemo(
		() => (name) => () => {
			handleFilterChande(null, { name, value: '' });
		},
		[ filter ]
	);

	return (
		<Container>
			<Table celled sortable>
				<Table.Header>
					{actionAdd && (
						<Table.Row>
							<Table.HeaderCell colSpan={headers.length}>{actionAdd}</Table.HeaderCell>
						</Table.Row>
					)}
					<Table.Row>
						{headers.map(({ id, filter: Filter, filterName, filterProps = {} }) => {
							return (
								<Table.HeaderCell>
									{Filter && (
										<Filter
											name={filterName}
											onChange={handleFilterChande}
											action={
												filter[filterName] ? (
													{
														icon: 'delete',
														onClick: handleClearFilter(filterName)
													}
												) : null
											}
											{...filterProps}
											value={filter[filterName] || ''}
										/>
									)}
								</Table.HeaderCell>
							);
						})}
					</Table.Row>
					<Table.Row>
						{headers.map(({ id, name, filterName, ...params }) => {
							return (
								<Table.HeaderCell
									key={id}
									{...params}
									className="break-space"
									sorted={
										filterName && sort.sortColumn === filterName ? (
											SortDirectionSemantic[sort.sortDirection]
										) : null
									}
									onClick={filterName && handleSort(filterName)}
								>
									{name}
								</Table.HeaderCell>
							);
						})}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{data &&
						data.data &&
						data.data.map((item) => {
							const { id } = item[idItem];
							return (
								<Table.Row key={id} {...getRowProps(item)}>
									{headers.map(({ id, dataItems, customRender }) => {
										if (customRender) {
											return (
												<Table.Cell key={id}>
													{customRender(item, handleFilterChande)}
												</Table.Cell>
											);
										}
										const itemContent = get(item, id);

										const dataItemsRender =
											dataItems && itemContent
												? dataItems
														.reduce(
															(acc, name) =>
																itemContent[name] ? [ ...acc, itemContent[name] ] : acc,
															[]
														)
														.join(', ')
												: itemContent;

										return (
											<Table.Cell key={id}>
												{id === 'actions' ? renderActionItem(item) : dataItemsRender || null}
											</Table.Cell>
										);
									})}
								</Table.Row>
							);
						})}
				</Table.Body>

				{data.countPages > 1 && (
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan={headers.length} textAlign="center">
								<Pagination
									activePage={page}
									totalPages={data.countPages}
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

export { TableComponent };
