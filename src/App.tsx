import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TagsTable } from './components/table/table-tags';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function App() {
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
               StackOverflow Tag Explorer
            </h1>
            <TagsTable />
         </main>
      </ThemeProvider>
   );
}

export default App;
