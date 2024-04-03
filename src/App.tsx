import './App.css';
import { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TagsTable } from './components/table/table-tags';
import { useTagStore } from './store/tagStore';
import { useFetch } from './lib/hooks/useFetch';
import { BASE_URL } from './lib/constants/endpoints';
import Container from '@mui/material/Container';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function App() {
   const page = useTagStore(state => state.page);
   const setPage = useTagStore(state => state.setPage);
   const resultsPerPage = useTagStore(state => state.resultsPerPage);
   const setTags = useTagStore(state => state.setTags);
   const fetchURL = `${BASE_URL}((&page=${page}&pagesize=${resultsPerPage}&order=desc&sort=popular&site=stackoverflow`;

   const queryKey = ['tagsData', page, resultsPerPage];
   const { data, isFetching, isError, isPending } = useFetch({
      url: fetchURL,
      queryKey,
   });

   useEffect(() => {
      if (data) {
         setTags(data.items);
      }
   }, [page, setPage, data, setTags]);

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
            <Container>
               <TagsTable
                  isFetching={isFetching}
                  isError={isError}
                  isPending={isPending}
               />
            </Container>
         </main>
      </ThemeProvider>
   );
}

export default App;
