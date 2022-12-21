import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const TotalUSD = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL USD
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.USD.toFixed(4).toLocaleString('en-US')}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 1
        }}
      >
        {
          (props.profit >= 0) ? 
            <ArrowUpwardIcon color="success" /> : 
            <ArrowDownwardIcon color="error" />
        }
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          {props.profit.toFixed(4).toLocaleString('en-US')}
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Profit
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 1
        }}
      >
        {
          (props.ratio >= 1) ? 
            <ArrowUpwardIcon color="success" /> : 
            <ArrowDownwardIcon color="error" />
        }
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          {props.ratio.toFixed(4)}
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Ratio
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
