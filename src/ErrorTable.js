import { TableBody, TableRow, TableCell, Link } from "@mui/material";
import React from "react";

export default function ErrorTable({ errorMessage }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={2}>There was an error:</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2}>{errorMessage}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2}>
          <Link href="/">Click to refresh.</Link>
        </TableCell>
      </TableRow>
      {Array.from({
        length: 7,
      }).map((_, idx) => (
        <TableRow key={idx}>
          <TableCell colSpan={2}>&nbsp;</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
