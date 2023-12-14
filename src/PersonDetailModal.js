import {
  Box,
  Link,
  Modal,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const PersonRowWithModal = ({
  name,
  birth_year,
  gender,
  hair_color,
  height,
  eye_color,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    p: 2,
    px: 4,
    pb: 3,
    textTransform: "capitalize",
  };
  const [open, setOpen] = useState(false);
  const handlePersonClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {name ? (
            <Link onClick={handlePersonClick}>{name}</Link>
          ) : (
            "Error: Person's name is missing"
          )}
        </TableCell>
        <TableCell align="right">{birth_year}</TableCell>
      </TableRow>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="Person detail"
      >
        <Box sx={style} component="div">
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            {name}
          </Typography>
          <Typography>
            <strong>Birthyear:</strong> {birth_year}
          </Typography>
          <Typography>
            <strong>Height:</strong> {height}
          </Typography>
          <Typography>
            <strong>Gender:</strong> {gender}
          </Typography>
          <Typography>
            <strong>Hair color:</strong> {hair_color}
          </Typography>
          <Typography>
            <strong>Eye color:</strong> {eye_color}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
