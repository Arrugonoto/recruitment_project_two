import './App.css';
import { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TagsTable } from './components/table/table-tags';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTagStore } from './store/tagStore';
import { useFetch } from './lib/hooks/useFetch';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function App() {
   const { handleFetch } = useFetch();
   const page = useTagStore(state => state.page);
   const setTags = useTagStore(state => state.setTags);
   const fetchURL = `https://api.stackexchange.com/2.3/tags?key=ZTvR*eaD5TgmFUlZvLPM6g((&page=${page}&order=desc&sort=popular&site=stackoverflow`;
   // https://api.stackexchange.com/2.3/tags?key=ZTvR*eaD5TgmFUlZvLPM6g((&site=stackoverflow&filter=total
   // returns total number of results
   // 30 results per page as default

   // const { isPending, isError, error, data, isFetching, isPlaceholderData } =
   //    useQuery({
   //       queryKey: ['tagsData', page],
   //       queryFn: () => handleFetch({ url: fetchURL }),
   //       placeholderData: keepPreviousData,
   //       refetchOnWindowFocus: false,
   //    });

   const { data } = useQuery({
      queryKey: ['tagsData', page],
      queryFn: () => handleFetch({ url: fetchURL }),
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
   });

   useEffect(() => {
      if (data) {
         setTags(data.items);
      }
   }, [data, setTags]);

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
            <TagsTable />
         </main>
      </ThemeProvider>
   );
}

export default App;
