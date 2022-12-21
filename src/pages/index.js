import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Box, Button, ToggleButton, ToggleButtonGroup, Stack, Container, Grid } from '@mui/material';
import { TotalUSD } from '../components/dashboard/total-usd';
import { TotalUSDT } from '../components/dashboard/total-usdt';
import { TotalBUSD } from '../components/dashboard/total-busd';
import { LatestAssetsChart } from '../components/dashboard/latest-assets-chart';
import { LatestAssetsTable } from '../components/dashboard/latest-assets-table';
import { DashboardLayout } from '../components/dashboard-layout';
import { useAuthContext } from '../contexts/auth-context';
import axios from 'axios';

const Page = () => {
  const { user } = useAuthContext();
  const initialized = useRef(false);
  const [servers, setServers] = useState([]);
  const [selectedServers, setSelectedServers] = useState([]);
  const [totalAsset, setTotalAsset] = useState({ 
    USD : {total : 0, profit : 0, ratio : 1}, 
    USDT : {total : 0, profit : 0, ratio : 1},
    BUSD : {total : 0, profit : 0, ratio : 1}
  });
  const [latestUSDs, setLatestUSDs] = useState([]);
  const [latestDates, setLatestDates] = useState([]);
  const [latestAssets, setLatestAssets] = useState([]);

  const handleServerSelect = (event, newFormats) => {
    setSelectedServers(newFormats);
  };

  const onUpdate = async () => {
    var serverIds = [];
    for (let server of servers)
    {
      if (selectedServers.indexOf(server.name) >= 0)
      {
        serverIds.push(server.id);
      }
    }

    if (serverIds.length == 0) return;

    var dates = ['', '', '', '', '', '', '', ''];
    var USDs = [0, 0, 0, 0, 0, 0, 0, 0];
    var USDTs = [0, 0, 0, 0, 0, 0, 0, 0];
    var BUSDs = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let server of servers)
    {
      if (selectedServers.indexOf(server.name) >= 0)
      {
        var res = await axios.post(`http://${process.env.NEXT_PUBLIC_TBMB_IP}/get_balance_list`, {serverId : server.id, startIndex : 0, count : 8});
        server.balances = res.data.datas

        for (let i = 0; i < server.balances.length; i++)
        {
          let balance = server.balances[i];
          dates[i] = balance.date;
          USDTs[i] += balance.USDT;
          BUSDs[i] += balance.BUSD;
          USDs[i] += balance.USDT + balance.BUSD;
        }
      }
    }

    var latestAssets2 = [];
    for (let i = 0; i < USDs.length - 1; i++)
    {
      let asset = {
        date : dates[i],
        totalUSD : USDs[i],
        profitUSD : USDs[i] - USDs[i + 1],
        ratioUSD : (USDs[i + 1] > 0) ? USDs[i] / USDs[i + 1] : 1,
        totalUSDT : USDTs[i],
        profitUSDT : USDTs[i] - USDTs[i + 1],
        ratioUSDT : (USDTs[i + 1] > 0) ? USDTs[i] / USDTs[i + 1] : 1,
        totalBUSD : BUSDs[i],
        profitBUSD : BUSDs[i] - BUSDs[i + 1],
        ratioBUSD : (BUSDs[i + 1] > 0) ? BUSDs[i] / BUSDs[i + 1] : 1
      }
      latestAssets2.push(JSON.parse(JSON.stringify(asset)));
    }
    
    var a = latestAssets2[0];
    setTotalAsset({ 
      USD : { total : a.totalUSD, profit : a.profitUSD, ratio : a.ratioUSD},
      USDT : { total : a.totalUSDT, profit : a.profitUSDT, ratio : a.ratioUSDT},
      BUSD : { total : a.totalBUSD, profit : a.profitBUSD, ratio : a.ratioBUSD}
    });    

    if (USDs.length > 7)
    {
      USDs.splice(7, 1);
      dates.splice(7, 1);
    } 
    setLatestUSDs(USDs);
    setLatestDates(dates);

    setLatestAssets(latestAssets2);
  }

  const initialize = async () => {
    var res = await axios.post(`http://${process.env.NEXT_PUBLIC_TBMB_IP}/get_server_list`, {id : user.id});

    var servers2 = []
    var serverNames = [];
    for (let server of res.data.datas)
    {
      servers2.push(server);
      serverNames.push(server.name);
    }
    setServers(servers2);
    setSelectedServers(serverNames);
  }

  useEffect(() => {
    if (initialized.current == false)
    {
      initialize();
      initialized.current = true;
    }

    onUpdate();
  }, [servers]);

  return(
    <>
      <Head>
        <title>
          Dashboard | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xl={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <Stack 
                direction="row" 
                spacing={2}
              >
                <ToggleButtonGroup
                  value={selectedServers}
                  onChange={handleServerSelect}
                  aria-label="server list"
                >
                  {
                    servers.map(server => (
                      <ToggleButton 
                        key={server.name} 
                        value={server.name} 
                        aria-label={server.name}
                      >
                        {server.name}
                      </ToggleButton>
                    ))
                  }
                </ToggleButtonGroup>
                <Button 
                  variant="outlined"
                  onClick={onUpdate}
                >
                  Update
                </Button>
              </Stack>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              sm={6}
              xs={12}
            >
              <TotalUSD 
                USD={totalAsset.USD.total} 
                profit={totalAsset.USD.profit} 
                ratio={totalAsset.USD.ratio}
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              sm={6}
              xs={12}
            >
              <TotalUSDT 
                USDT={totalAsset.USDT.total}
                profit={totalAsset.USDT.profit} 
                ratio={totalAsset.USDT.ratio}
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              sm={6}
              xs={12}
            >
              <TotalBUSD 
                BUSD={totalAsset.BUSD.total}
                profit={totalAsset.BUSD.profit} 
                ratio={totalAsset.BUSD.ratio}
              />
            </Grid>          
            <Grid
              item
              xl={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <LatestAssetsChart 
                USDs={latestUSDs} 
                dates={latestDates}
              />
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <LatestAssetsTable assets={latestAssets}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
