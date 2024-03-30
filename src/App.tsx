import './App.css';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TagsTable } from './components/table/table-tags';
import {
   keepPreviousData,
   useQuery,
   useQueryClient,
} from '@tanstack/react-query';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function App() {
   const [page, setPage] = useState<number>(1);
   const queryClient = useQueryClient();
   const fetchURL =
      'https://api.stackexchange.com/2.3/tags?key=ZTvR*eaD5TgmFUlZvLPM6g((&page=1&order=desc&sort=popular&site=stackoverflow';
   // https://api.stackexchange.com/2.3/tags?key=ZTvR*eaD5TgmFUlZvLPM6g((&site=stackoverflow&filter=total
   // returns total number of pages
   // 30 results per page as default
   // so getting proper request was little tricky because I think the docs are little chaotic

   const fetchData = async () => {
      const response = await fetch(fetchURL);
      const result = await response.json();
      console.log(response);
      console.log('lol');

      if (!response.ok) {
         console.error('bad request');
         throw new Error(`Could not fetch source.`);
      }

      return result;
   };

   const { isPending, isError, error, data, isFetching, isPlaceholderData } =
      useQuery({
         queryKey: ['badgesData', page],
         queryFn: () => fetchData(),
         placeholderData: keepPreviousData,
      });

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <main
            style={{
               display: 'flex',
               flexDirection: 'column',
               maxWidth: '1280px',
               width: '100%',
               margin: '0 auto',
               padding: '1rem 2rem',
               textAlign: 'center',
               gap: '2rem',
            }}
         >
            <h1
               style={{
                  fontSize: '1.8rem',
                  letterSpacing: '1px',
                  fontWeight: 500,
                  alignSelf: 'start',
               }}
            >
               StackOverflow Tag explorer
            </h1>
            <div>
               {data.map(el => (
                  <p>{el.name}</p>
               ))}
            </div>
            <TagsTable />
         </main>
      </ThemeProvider>
   );
}

export default App;
