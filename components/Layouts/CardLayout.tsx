import React, { useCallback, useState, Fragment } from 'react';
import { Form, Modal, Table, Icon, Label, Button } from 'semantic-ui-react';
import get from 'lodash/get';

export const CardLayout = ({ children, initialFormData, model, onDelete }) => {
	const [ modalOpened, setModalOpened ] = useState(false);
	const toggleModal = useCallback(
		() => {
			setModalOpened(!modalOpened);
		},
		[ modalOpened ]
	);

	const handleDelete = useCallback(
		() => {
			onDelete().then(() => toggleModal());
		},
		[ onDelete ]
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
			className="company-modal"
			size="small"
		>
			<Modal.Header>{model.header.headerRender(initialFormData[model.header.name])}</Modal.Header>
			<Modal.Content>
				<Table basic="very" celled>
					{model.items.map(({ customRender, name, dataItems, label }) => {
						if (customRender) {
							return (
								<Table.Row key={name}>
									<Table.Cell>{label}</Table.Cell>
									<Table.Cell>{customRender(initialFormData)}</Table.Cell>
								</Table.Row>
							);
						}
						const itemContent = get(initialFormData, name);

						const dataItemsRender =
							dataItems && itemContent
								? dataItems
										.reduce(
											(acc, name) => (itemContent[name] ? [ ...acc, itemContent[name] ] : acc),
											[]
										)
										.join(', ')
								: itemContent;

						return (
							<Table.Row key={name}>
								<Table.Cell>{label}</Table.Cell>
								<Table.Cell key={name}>{dataItemsRender || null}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table>
			</Modal.Content>
			<Modal.Actions>
				<Button labelPosition="right" icon onClick={handleDelete} color="red">
					<Icon name="delete" />
					Удалить
				</Button>
				<Button labelPosition="right" icon onClick={handlePrint}>
					<Icon name="print" />
					Печать
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
