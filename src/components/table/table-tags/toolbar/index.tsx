import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';

export const EnhancedTableToolbar = ({
   resultsPerPage,
   setResultsPerPage,
   setPage,
}: {
   resultsPerPage: number;
   setResultsPerPage: (resultsPerPage: number) => void;
   setPage: (page: number) => void;
}) => {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parseInt(e.target.value, 10);

      if (!e.target.value || numericValue < 0) {
         setResultsPerPage(1);
      } else if (numericValue > 100) {
         setResultsPerPage(100);
      } else {
         setResultsPerPage(numericValue);
      }

      setPage(1);
   };

   return (
      <Toolbar
         sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
         }}
      >
         <Typography
            sx={{ flex: '1 1 100%', textAlign: 'left' }}
            variant="h6"
            id="tableTitle"
            component="div"
         >
            Tags
         </Typography>
         <Typography
            sx={{
               display: 'flex',
               flexWrap: 'nowrap',
               gap: '0.5rem',
               alignItems: 'center',
            }}
            component="div"
         >
            <p style={{ whiteSpace: 'nowrap' }}>Results per page</p>
            <TextField
               hiddenLabel
               id="input-results"
               variant="filled"
               type="number"
               size="small"
               value={resultsPerPage}
               inputProps={{
                  min: 1,
                  max: 100,
               }}
               sx={{ width: 80 }}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
               }
            />
            <Tooltip title="Accepts value between 1 - 100" placement="bottom">
               <IconButton color="info">
                  <HelpIcon></HelpIcon>
               </IconButton>
            </Tooltip>
         </Typography>
      </Toolbar>
   );
};
