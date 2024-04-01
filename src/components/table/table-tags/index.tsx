import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import type { OmitBooleanTagComparator } from '../../../lib/types/tag';
import { useTagStore } from '../../../store/tagStore';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof OmitBooleanTagComparator>(
   order: Order,
   orderBy: Key
): (
   a: { [key in Key]: number | string },
   b: { [key in Key]: number | string }
) => number {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
   array: readonly T[],
   comparator: (a: T, b: T) => number
) {
   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
         return order;
      }
      return a[1] - b[1];
   });
   return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
   disablePadding: boolean;
   id: keyof OmitBooleanTagComparator;
   label: string;
   numeric: boolean;
}

const headCells: readonly HeadCell[] = [
   {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Tag name ',
   },
   {
      id: 'count',
      numeric: true,
      disablePadding: false,
      label: 'Posts count',
   },
];

interface EnhancedTableProps {
   onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof OmitBooleanTagComparator
   ) => void;
   order: Order;
   orderBy: string;
   rowCount: number;
}

interface TablePaginationActionsProps {
   count: number;
   page: number;
   rowsPerPage: number;
   onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
   ) => void;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
   const { order, orderBy, onRequestSort } = props;
   const createSortHandler =
      (property: keyof OmitBooleanTagComparator) =>
      (event: React.MouseEvent<unknown>) => {
         onRequestSort(event, property);
      };

   return (
      <TableHead>
         <TableRow>
            {headCells.map(headCell => (
               <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                  >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                           {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                        </Box>
                     ) : null}
                  </TableSortLabel>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   );
};

const EnhancedTableToolbar = () => {
   return (
      <Toolbar
         sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
         }}
      >
         <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
         >
            Tags
         </Typography>
      </Toolbar>
   );
};

export const TagsTable = () => {
   const tags = useTagStore(state => state.tags);
   const page = useTagStore(state => state.page);
   const setPage = useTagStore(state => state.setPage);
   const resultsPerPage = useTagStore(state => state.resultsPerPage);
   const [order, setOrder] = useState<Order>('asc');
   const [orderBy, setOrderBy] =
      useState<keyof OmitBooleanTagComparator>('name');

   const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof OmitBooleanTagComparator
   ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleChangePage = (
      event: React.MouseEvent | null,
      newPage: number
   ) => {
      setPage(newPage + 1);

      console.log(newPage);
   };

   // const handleChangeRowsPerPage = (
   //    event: React.ChangeEvent<HTMLInputElement>
   // ) => {
   //    setPage(1);
   // };

   // Avoid a layout jump when reaching the last page with empty rows.

   const sortedRows = stableSort(tags, getComparator(order, orderBy));

   return (
      <Box sx={{ width: '100%' }}>
         <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar />
            <TableContainer sx={{ maxHeight: 600 }}>
               <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={'medium'}
                  stickyHeader
               >
                  <EnhancedTableHead
                     order={order}
                     orderBy={orderBy}
                     onRequestSort={handleRequestSort}
                     rowCount={tags.length}
                  />
                  <TableBody>
                     {sortedRows?.map((row, index) => {
                        const labelId = `tag-${index}`;

                        return (
                           <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                              sx={{
                                 cursor: 'pointer',
                                 width: '100%',
                              }}
                           >
                              <TableCell
                                 component="th"
                                 id={labelId}
                                 scope="row"
                                 padding="none"
                                 sx={{
                                    pl: '1rem',
                                 }}
                              >
                                 {row.name}
                              </TableCell>
                              <TableCell align="right">{row.count}</TableCell>
                           </TableRow>
                        );
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[30, 50]}
               component="div"
               count={-1}
               rowsPerPage={resultsPerPage}
               page={page - 1}
               onPageChange={handleChangePage}
               // onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </Paper>
      </Box>
   );
};
