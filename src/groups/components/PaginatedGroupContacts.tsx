import React, { Children, isValidElement, useCallback } from 'react';
import {
  Datagrid,
  DatagridClasses,
  DatagridHeaderCell,
  DateField,
  EmailField,
  Pagination,
  TextField,
  useTranslate
} from 'react-admin';
import type { Identifier, RaRecord, SortPayload } from 'react-admin';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import clsx from 'clsx';
import { GroupContactNameLink } from './GroupContactNameLink.tsx';
import { GroupContactActions } from './GroupContactActions.tsx';

interface PaginatedDatagridHeaderProps<RecordType extends RaRecord = RaRecord> {
  children?: React.ReactNode;
  className?: string;
  hasBulkActions?: boolean;
  isRowSelectable?: (record: RecordType) => boolean;
  sort?: SortPayload;
  data?: RecordType[];
  onSelect?: (ids: Identifier[]) => void;
  selectedIds?: Identifier[];
  setSort?: (sort: SortPayload) => void;
}

const PaginatedDatagridHeader = (props: PaginatedDatagridHeaderProps) => {
  const {
    children,
    className,
    hasBulkActions = false,
    isRowSelectable,
    sort,
    data,
    onSelect,
    selectedIds,
    setSort
  } = props;
  const translate = useTranslate();

  const updateSort = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      if (!setSort) return;
      const currentTarget = event.currentTarget as HTMLElement;
      const newField = currentTarget.dataset.field;
      if (!newField) return;
      const newOrder: SortPayload['order'] =
        sort?.field === newField
          ? sort?.order === 'ASC'
            ? 'DESC'
            : 'ASC'
          : ((currentTarget.dataset.order ?? 'ASC') as SortPayload['order']);
      setSort({ field: newField, order: newOrder });
    },
    [sort?.field, sort?.order, setSort]
  );

  const selectableIds = Array.isArray(data)
    ? isRowSelectable
      ? data.filter((record) => isRowSelectable(record)).map((record) => record.id)
      : data.map((record) => record.id)
    : [];

  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!onSelect || !selectedIds || !data) return;
      const nextSelected = event.target.checked
        ? Array.from(new Set([...selectedIds, ...selectableIds]))
        : selectedIds.filter((id) => !selectableIds.includes(id));
      onSelect(nextSelected);
    },
    [data, onSelect, selectableIds, selectedIds]
  );

  return (
    <TableHead className={clsx(className, DatagridClasses.thead)}>
      <TableRow className={clsx(DatagridClasses.row, DatagridClasses.headerRow)}>
        {hasBulkActions && selectedIds && (
          <TableCell padding="checkbox" className={DatagridClasses.headerCell}>
            <Checkbox
              inputProps={{
                'aria-label': translate('ra.action.select_all', { _: 'Select all' })
              }}
              className="select-all"
              color="primary"
              checked={
                selectedIds.length > 0 &&
                selectableIds.length > 0 &&
                selectableIds.every((id) => selectedIds.includes(id))
              }
              onChange={handleSelectAll}
              onClick={(event) => event.stopPropagation()}
            />
          </TableCell>
        )}
        {Children.map(children, (field, index) =>
          isValidElement(field) ? (
            <DatagridHeaderCell
              className={clsx(
                DatagridClasses.headerCell,
                `column-${(field.props as { source?: string }).source ?? ''}`
              )}
              sort={sort}
              field={field}
              isSorting={
                sort?.field ===
                ((field.props as { sortBy?: string; source?: string }).sortBy ??
                  (field.props as { source?: string }).source)
              }
              key={(field.props as { source?: string }).source ?? index}
              updateSort={setSort ? updateSort : undefined}
            />
          ) : null
        )}
      </TableRow>
    </TableHead>
  );
};

export const PaginatedGroupContacts: React.FC = () => {
  return (
    <>
      <Datagrid
        header={PaginatedDatagridHeader}
        bulkActionButtons={<></>}
        bulkActionsToolbar={<></>}
        empty={<></>}
      >
        <GroupContactNameLink source="displayName" label="Name" sortable />
        <EmailField source="primaryEmail" label="Email" />
        <TextField source="primaryPhone" label="Phone" />
        <DateField source="dateAdded" label="Added" locales="en-US" options={{ timeZone: 'UTC' }} />
        <GroupContactActions />
      </Datagrid>
      <Pagination />
    </>
  );
};
