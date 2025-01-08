import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material";

const StyledTableContainer = styled(TableContainer)({
  th: { fontWeight: 900, background: "#fafafa", border: "1px solid #f0f0f0" },
  table: {
    border: "1px solid #f0f0f0",
  },
  td: {
    border: "1px solid #f0f0f0",
  },
});

function Row({ row, headers, subColumns }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {headers?.map((value) => (
          <TableCell align="right">
            {value.cellRenderer
              ? value.cellRenderer(row[value?.field])
              : row[value?.field]}
          </TableCell>
          //   <TableCell align="right">{row?.[value?.field]}</TableCell>
        ))}
      </TableRow>
      <TableRow style={{ textAlign: "right" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{ margin: 1, marginLeft: "5%" }}
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {subColumns?.map((value) => (
                      <TableCell align="right">{value?.title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.positions?.map((rowData) => (
                    <TableRow>
                      {subColumns?.map((value) => (
                        <TableCell align="right">
                          {value.cellRenderer
                            ? value.cellRenderer(rowData[value?.field])
                            : rowData[value?.field]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CustomTable({ headers, data = [], subColumns }) {
  return (
    <StyledTableContainer component={Paper}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell />
            {headers?.map((value) => (
              <TableCell style={{ textAlign: "right" }}>
                {value?.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length &&
            data?.map((row) => (
              <Row
                key={row.name}
                row={row}
                headers={headers}
                subColumns={subColumns}
              />
            ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
