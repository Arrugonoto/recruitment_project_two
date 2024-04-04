import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import type { Order } from '../../../lib/types/order';
import type { OmitBooleanTagComparator } from '../../../lib/types/tag';

interface HeadCell {
   disablePadding: boolean;
   id: keyof OmitBooleanTagComparator;
   label: string;
   numeric: boolean;
}

interface EnhancedTableProps {
   /** Sorting click handler  */
   onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof OmitBooleanTagComparator
   ) => void;
   /** Sorting direction 'asc' | 'desc'*/
   order: Order;
   /** Sorting order by [value] */
   orderBy: string;
   /** Number of returned rows per page, accepts values between 1 - 100, default: 30*/
   rowCount: number;
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

/**
 * Table Head component based on MUI library TableHead component, for more information see: https://mui.com/material-ui/api/table-head/
 */

export const EnhancedTableHead = (props: EnhancedTableProps) => {
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
                  sx={{ width: '100%', whiteSpace: 'nowrap' }}
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
