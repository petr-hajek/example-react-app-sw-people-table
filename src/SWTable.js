import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ErrorTable from "ErrorTable";
import { PersonRowWithModal } from "PersonDetailModal";
import { useEffect, useState } from "react";

const DEBOUNCE_MS = 400;
const SW_API = "https://swapi.dev/api";

const getPeople = async ({ queryKey }) => {
  const [, page, searchTerm] = queryKey;
  const response = await fetch(
    `${SW_API}/people/?page=${page}${searchTerm ? `&search=${searchTerm}` : ""}`
  );
  if (!response.ok) {
    throw new Error(`${response.status}: Network response was not ok`);
  }
  return response.json();
};

export default function SWTable() {
  // basic state & handlers
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // debounce search term to prevent extra data fetching
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(0);
      setDebouncedSearchTerm(searchTerm);
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // data fetching
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["person", currentPage + 1, debouncedSearchTerm],
    queryFn: getPeople,
  });

  // persist count while loading different page
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (data) {
      setCount(data.count);
    }
  }, [data]);

  return (
    <main>
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        fullWidth
        label={"Search by name"}
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        sx={{ mb: 1 }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="Star Wars table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Birth Year</TableCell>
            </TableRow>
          </TableHead>

          {isError ? (
            <ErrorTable errorMessage={error.message} />
          ) : isPending ? (
            <TableBody>
              {Array.from({ length: 10 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell colSpan={2}>
                    <Skeleton variant="text" width="50%" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {data?.results?.map((person) => (
                <PersonRowWithModal key={person.url} {...person} />
              ))}
              {Array.from({
                length: 10 - data?.results?.length,
              }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell colSpan={2}>
                    {idx === 0 && data.results.length === 0 ? (
                      <strong>No results found</strong>
                    ) : (
                      <>&nbsp;</>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
              <TablePagination
                showFirstButton
                showLastButton
                rowsPerPageOptions={[10]}
                rowsPerPage={10}
                count={count}
                page={count ? currentPage : 0}
                onPageChange={(_, newPage) => {
                  setCurrentPage(newPage);
                }}
                disabled={isPending}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </main>
  );
}
