import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const LatestAssetsChart = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor : 'rgb(54, 162, 235)',
        barPercentage: 0.5,
        barThickness: 20,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: props.USD,
        label: 'USD',
        maxBarThickness: 20,
        borderWidth: 1
      }
    ],
    labels: ['2022-12-07', '2022-12-06', '2022-12-05', '2022-12-04', '2022-12-03', '2022-12-02', '2022-12-01']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {      
      y: {
        beginAtZero: false,
        min: Math.min(...props.USD) * 0.98
      }
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 days
          </Button>
        )}
        title="Latest Assets"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 500,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
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
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
