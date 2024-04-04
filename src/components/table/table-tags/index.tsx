import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import type { OmitBooleanTagComparator } from '../../../lib/types/tag';
import { useFetch } from '../../../lib/hooks/useFetch';
import { useTagStore } from '../../../store/tagStore';
import Skeleton from '@mui/material/Skeleton';
import { BASE_URL } from '../../../lib/constants/endpoints';
import { EnhancedTableHead } from './head';
import { EnhancedTableToolbar } from './toolbar';
import type { Order } from '../../../lib/types/order';
import { getComparator } from '../../../lib/helpers/sortData';
import { stableSort } from '../../../lib/helpers/sortData';

type TableProps = {
   isFetching: boolean;
   isError: boolean;
   isPending: boolean;
};

export const TagsTable = ({ isFetching, isError, isPending }: TableProps) => {
   const tags = useTagStore(state => state.tags);
   const page = useTagStore(state => state.page);
   const setPage = useTagStore(state => state.setPage);
   const resultsPerPage = useTagStore(state => state.resultsPerPage);
   const setResultsPerPage = useTagStore(state => state.setResultsPerPage);
   const setTotalResults = useTagStore(state => state.setTotalResults);
   const totalResults = useTagStore(state => state.totalResults);
   const [order, setOrder] = useState<Order>('asc');
   const [orderBy, setOrderBy] =
      useState<keyof OmitBooleanTagComparator>('name');
   const totalURL = `${BASE_URL}((&site=stackoverflow&filter=total`;
   const queryKey = ['totalResults'];
   const { data } = useFetch({ url: totalURL, queryKey });

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
   };

   const sortedRows = stableSort(tags, getComparator(order, orderBy));

   useEffect(() => {
      if (data) setTotalResults(data.total);
      // eslint-disable-next-line
   }, [data, resultsPerPage]);

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
                     rowCount={tags.length}
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
               count={totalResults}
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
