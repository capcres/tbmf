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
  const [latestUSD, setLatestUSD] = useState([0, 0, 0, 0, 0, 0, 0]);

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

    var totalUSD = 0;
    var totalUSDT = 0;
    var totalBUSD = 0;

    var totalUSD2 = 0;
    var totalUSDT2 = 0;
    var totalBUSD2 = 0;

    var latestUSD2 = [0, 0, 0, 0, 0, 0, 0];
    for (let server of servers)
    {
      if (selectedServers.indexOf(server.name) >= 0)
      {
        var res = await axios.post(`http://${process.env.NEXT_PUBLIC_TBMB_IP}/get_balance_list`, {serverId : server.id, startIndex : 0, count : 7});
        server.balances = res.data.datas

        if (server.balances.length > 0)
        {
          totalUSDT += server.balances[0].USDT;
          totalBUSD += server.balances[0].BUSD;          
        }
        if (server.balances.length > 1)
        {
          totalUSDT2 += server.balances[1].USDT;
          totalBUSD2 += server.balances[1].BUSD;
        }

        for (let i = 0; i < server.balances.length; i++)
        {
          let balance = server.balances[i];
          latestUSD2[i] += balance.USDT + balance.BUSD;
        }
      }
    }
    totalUSD = totalUSDT + totalBUSD;
    totalUSD2 = totalUSDT2 + totalBUSD2;

    setTotalAsset({ 
      USD : { total : totalUSD, profit : totalUSD - totalUSD2, ratio : (totalUSD2 > 0) ? totalUSD / totalUSD2 : 1},
      USDT : { total : totalUSDT, profit : totalUSDT - totalUSDT2, ratio : (totalUSDT > 0) ? totalUSDT / totalUSDT2 : 1},
      BUSD : { total : totalBUSD, profit : totalBUSD - totalBUSD, ratio : (totalBUSD > 0) ? totalBUSD / totalBUSD2 : 1}
    });

    setLatestUSD(latestUSD2);
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
              <LatestAssetsChart USD={latestUSD}/>
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <LatestAssetsTable />
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
