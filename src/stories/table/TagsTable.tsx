import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import type { OmitBooleanTagComparator, Tag } from '../../lib/types/tag';
import { useTagStore } from '../../store/tagStore';
import Skeleton from '@mui/material/Skeleton';
import { EnhancedTableHead } from './head/EnhancedTableHead';
import { EnhancedTableToolbar } from './toolbar/EnhancedTableToolbar';
import type { Order } from '../../lib/types/order';
import { getComparator } from '../../lib/helpers/sortData';
import { stableSort } from '../../lib/helpers/sortData';

type TableProps = {
   /**
    * TanStack query fetch status, for more information see: https://tanstack.com/query/latest/docs/framework/react/guides/queries
    */
   isFetching: boolean;
   /**
    * TanStack query error status
    */
   isError: boolean;
   /**
    * TanStack query pending status
    */
   isPending: boolean;
};

/**
 * TagsTable component based on MUI library Table component, for more information see: https://mui.com/material-ui/react-table/
 */
export const TagsTable = ({ isFetching, isError, isPending }: TableProps) => {
   const page = useTagStore(state => state.page);
   const setPage = useTagStore(state => state.setPage);
   const resultsPerPage = useTagStore(state => state.resultsPerPage);
   const setResultsPerPage = useTagStore(state => state.setResultsPerPage);
   const [order, setOrder] = useState<Order>('asc');
   const [orderBy, setOrderBy] =
      useState<keyof OmitBooleanTagComparator>('name');
   const names: string[] = [
      'javascript',
      'css',
      'html',
      'react',
      'next.js',
      'vue',
      'svelte',
      'angular',
      'typescript',
      'nuxtjs',
      'gatsby',
   ];

   const handleRequestSort = (
      _event: React.MouseEvent<unknown>,
      property: keyof OmitBooleanTagComparator
   ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleChangePage = (
      _event: React.MouseEvent | null,
      newPage: number
   ) => {
      setPage(newPage + 1);
      console.log(page);
   };

   const rows: Tag[] = Array.from({ length: 246 }, (_, index) => {
      const tagName = names[Math.floor(Math.random() * names.length)];
      const has_synonyms = index % 2 === 0 ? true : false;
      const is_moderator_only = index % 2 === 0 ? false : true;
      const is_required = index % 2 === 0 ? true : false;
      const countValue = Math.floor(Math.random() * 63 * index + 1);

      return {
         name: tagName,
         count: countValue,
         has_synonyms: has_synonyms,
         is_required: is_required,
         is_moderator_only: is_moderator_only,
      };
   });
   const sortedRows = stableSort(rows, getComparator(order, orderBy)).slice(
      (page - 1) * resultsPerPage,
      page * resultsPerPage
   );

   return (
      <Box sx={{ width: '100%' }}>
         <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
               resultsPerPage={resultsPerPage}
               setResultsPerPage={setResultsPerPage}
               setPage={setPage}
            />
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
                     rowCount={rows.length}
                  />
                  <TableBody>
                     {(isFetching || isPending) &&
                        Array.from({ length: 14 }).map((_, index) => (
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
                                 scope="row"
                                 padding="none"
                                 colSpan={2}
                                 sx={{
                                    pl: '1rem',
                                    w: '100%',
                                 }}
                              >
                                 <Skeleton height={40} />
                              </TableCell>
                           </TableRow>
                        ))}
                     {!isFetching && !isPending && isError && (
                        <TableRow>
                           <TableCell colSpan={2} sx={{ height: '100%' }}>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    textAlign: 'center',
                                    gap: '0.8rem',
                                    py: '1rem',
                                 }}
                              >
                                 <h2>Couldn't load data.</h2>
                                 <p>
                                    Check network connection and refresh page.
                                    If it doesn't help try again later.
                                 </p>
                              </Box>
                           </TableCell>
                        </TableRow>
                     )}
                     {!isFetching &&
                        !isPending &&
                        !isError &&
                        sortedRows?.map((row, index) => {
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
                                    <Chip label={row.name} />
                                 </TableCell>
                                 <TableCell align="right">
                                    {row.count}
                                 </TableCell>
                              </TableRow>
                           );
                        })}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[]}
               component="div"
               count={rows.length}
               rowsPerPage={resultsPerPage}
               page={page - 1}
               onPageChange={handleChangePage}
               showFirstButton
               showLastButton
            />
         </Paper>
      </Box>
   );
};
