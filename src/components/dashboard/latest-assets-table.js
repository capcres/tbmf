import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableFooter,
  TablePagination 
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#616161',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const LatestAssetsTable = (props) => {

  const handleChangePage = (event, newPage) => {
    //setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    //setRowsPerPage(parseInt(event.target.value, 10));
    //setPage(0);
  };

  return(
    <Card {...props}>
      <CardHeader title="Latest Assets" />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  Date
                </StyledTableCell>
                <StyledTableCell>
                  USD
                </StyledTableCell>
                <StyledTableCell>
                  USD[Profit]
                </StyledTableCell>
                <StyledTableCell>
                  USD[Ratio]
                </StyledTableCell>
                <StyledTableCell>
                  USDT
                </StyledTableCell>
                <StyledTableCell>
                  USDT[Profit]
                </StyledTableCell>
                <StyledTableCell>
                  USDT[Ratio]
                </StyledTableCell>
                <StyledTableCell>
                  BUSD
                </StyledTableCell>
                <StyledTableCell>
                  BUSD[Profit]
                </StyledTableCell>
                <StyledTableCell>
                  BUSD[Ratio]
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.assets.map((asset) => (
                <StyledTableRow key={asset.date}>
                  <StyledTableCell>
                    {asset.date}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.totalUSD.toFixed(4).toLocaleString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.profitUSD.toFixed(4).toLocaleString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.ratioUSD.toFixed(4)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.totalUSDT.toFixed(4).toLocaleString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.profitUSDT.toFixed(4).toLocaleString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.ratioUSDT.toFixed(4)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.totalBUSD.toFixed(4).toLocaleString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.profitBUSD.toFixed(4).toLocaleString('en-US')}
                  </StyledTableCell>
                  <StyledTableCell>
                    {asset.ratioBUSD.toFixed(4)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={100}
                  rowsPerPage={5}
                  page={0}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
