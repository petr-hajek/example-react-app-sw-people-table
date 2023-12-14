import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SWTable from "SWTable";
import {
  Box,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ maxWidth: "600px", m: "1rem auto", textAlign: "center" }}>
        <header>
          <img
            src="/sw_logo_stacked_2x.webp"
            alt="Star Wars Logo"
            width="300px"
          />
          <Typography m={1}>
            App that displays people from{" "}
            <Link href="https://swapi.dev/documentation#people">SW API</Link>
          </Typography>
        </header>
        <QueryClientProvider client={queryClient}>
          <SWTable />
        </QueryClientProvider>
        <footer>
          <Typography mt={2}>Created by Petr Hajek</Typography>
        </footer>
      </Box>
    </ThemeProvider>
  );
};

export default App;
