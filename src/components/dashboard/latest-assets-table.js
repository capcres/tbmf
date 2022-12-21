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
  TableContainer
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const assets = [
  {
    date : '2022-12-07',
    totalUSD : 3456.233,
    profitUSD : 34.22,
    ratioUSD : 1.002,
    totalUSDT : 3456.233,
    profitUSDT : 34.22,
    ratioUSDT : 1.002,
    totalBUSD : 0,
    profitBUSD : 0,
    ratioBUSD : 1.000
  },
  {
    date : '2022-12-06',
    totalUSD : 3456.233,
    profitUSD : 34.22,
    ratioUSD : 1.002,
    totalUSDT : 3456.233,
    profitUSDT : 34.22,
    ratioUSDT : 1.002,
    totalBUSD : 0,
    profitBUSD : 0,
    ratioBUSD : 1.000
  },
  {
    date : '2022-12-05',
    totalUSD : 3456.233,
    profitUSD : 34.22,
    ratioUSD : 1.002,
    totalUSDT : 3456.233,
    profitUSDT : 34.22,
    ratioUSDT : 1.002,
    totalBUSD : 0,
    profitBUSD : 0,
    ratioBUSD : 1.000
  },
  {
    date : '2022-12-04',
    totalUSD : 3456.233,
    profitUSD : 34.22,
    ratioUSD : 1.002,
    totalUSDT : 3456.233,
    profitUSDT : 34.22,
    ratioUSDT : 1.002,
    totalBUSD : 0,
    profitBUSD : 0,
    ratioBUSD : 1.000
  },
  {
    date : '2022-12-03',
    totalUSD : 3456.233,
    profitUSD : 34.22,
    ratioUSD : 1.002,
    totalUSDT : 3456.233,
    profitUSDT : 34.22,
    ratioUSDT : 1.002,
    totalBUSD : 0,
    profitBUSD : 0,
    ratioBUSD : 1.000
  },
  {
    date : '2022-12-02',
    totalUSD : 3456.233,
    profitUSD : 34.22,
    ratioUSD : 1.002,
    totalUSDT : 3456.233,
    profitUSDT : 34.22,
    ratioUSDT : 1.002,
    totalBUSD : 0,
    profitBUSD : 0,
    ratioBUSD : 1.000
  },
  {
    date : '2022-12-01',
    totalUSD : 3456.233,
    profitUSD : 34.22,
    ratioUSD : 1.002,
    totalUSDT : 3456.233,
    profitUSDT : 34.22,
    ratioUSDT : 1.002,
    totalBUSD : 0,
    profitBUSD : 0,
    ratioBUSD : 1.000
  },
];

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

export const LatestAssetsTable = (props) => (
  <Card {...props}>
    <CardHeader title="Latest Orders" />
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
            {assets.map((asset) => (
              <StyledTableRow key={asset.date}>
                <StyledTableCell>
                  {asset.date}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.totalUSD}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.profitUSD}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.ratioUSD}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.totalUSDT}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.profitUSDT}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.ratioUSDT}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.totalBUSD}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.profitBUSD}
                </StyledTableCell>
                <StyledTableCell>
                  {asset.ratioBUSD}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
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
