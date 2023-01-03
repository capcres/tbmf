import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Box, Button, ToggleButton, ToggleButtonGroup, Stack, Container, Grid, Divider } from '@mui/material';
import { TotalUSD } from '../components/dashboard/total-usd';
import { TotalUSDT } from '../components/dashboard/total-usdt';
import { TotalBUSD } from '../components/dashboard/total-busd';
import { AssetsChartTable } from '../components/dashboard/assets-chart-table';
import { DashboardLayout } from '../components/dashboard-layout';
import { useAuthContext } from '../contexts/auth-context';
import axios from 'axios';

const Page = () => {
  const { user } = useAuthContext();
  const initialized = useRef(false);
  const [servers, setServers] = useState([]);
  const [selectedServers, setSelectedServers] = useState([]);
  const [selectedServerIds, setSelectedServerIds] = useState([]);
  const [totalAsset, setTotalAsset] = useState({ 
    USD : {total : 0, profit : 0, ratio : 1}, 
    USDT : {total : 0, profit : 0, ratio : 1},
    BUSD : {total : 0, profit : 0, ratio : 1}
  });

  const onUpdate = async () => {
    var tmpSelectedServerIds = [];
    for (let [index, server] of servers.entries())
    {
      if (selectedServers[index])
      {
        tmpSelectedServerIds.push(server.id);
      }
    }
    setSelectedServerIds(tmpSelectedServerIds);

    if (tmpSelectedServerIds.length == 0) return;

    var tmpLatestUSDs = [0, 0];
    var tmpLatestUSDTs = [0, 0];
    var tmpLatestBUSDs = [0, 0];
    for (let [index, server] of servers.entries())
    {
      if (selectedServers[index])
      {
        var res = await axios.post(`http://${process.env.NEXT_PUBLIC_TBMB_IP}/get_balance_list`, {serverId : server.id, startIndex : 0, count : 2});
        server.balances = res.data.datas

        for (let i = 0; i < server.balances.length; i++)
        {
          let balance = server.balances[i];
          tmpLatestUSDTs[i] += balance.USDT;
          tmpLatestBUSDs[i] += balance.BUSD;
          tmpLatestUSDs[i] += balance.USDT + balance.BUSD;
        }
      }
    }

    var tmpLatestAssets = [];
    for (let i = 0; i < tmpLatestUSDs.length - 1; i++)
    {
      let asset = {
        id : i + 1,
        totalUSD : tmpLatestUSDs[i],
        profitUSD : tmpLatestUSDs[i] - tmpLatestUSDs[i + 1],
        ratioUSD : (tmpLatestUSDs[i + 1] > 0) ? tmpLatestUSDs[i] / tmpLatestUSDs[i + 1] : 1,
        totalUSDT : tmpLatestUSDTs[i],
        profitUSDT : tmpLatestUSDTs[i] - tmpLatestUSDTs[i + 1],
        ratioUSDT : (tmpLatestUSDTs[i + 1] > 0) ? tmpLatestUSDTs[i] / tmpLatestUSDTs[i + 1] : 1,
        totalBUSD : tmpLatestBUSDs[i],
        profitBUSD : tmpLatestBUSDs[i] - tmpLatestBUSDs[i + 1],
        ratioBUSD : (tmpLatestBUSDs[i + 1] > 0) ? tmpLatestBUSDs[i] / tmpLatestBUSDs[i + 1] : 1
      }
      tmpLatestAssets.push(JSON.parse(JSON.stringify(asset)));
    }
    
    var a = tmpLatestAssets[0];
    setTotalAsset({ 
      USD : { total : a.totalUSD, profit : a.profitUSD, ratio : a.ratioUSD},
      USDT : { total : a.totalUSDT, profit : a.profitUSDT, ratio : a.ratioUSDT},
      BUSD : { total : a.totalBUSD, profit : a.profitBUSD, ratio : a.ratioBUSD}
    }); 
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
    setSelectedServers(Array.from({length : servers2.length}, () => true));
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
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"                
                spacing={1}
              >
                {
                  servers.map((server, index) => (
                    <Grid
                      key={server.name}
                      item
                    >
                      <ToggleButton 
                        key={server.name} 
                        value={server.name}
                        selected={selectedServers[index]}
                        onChange={()=>{selectedServers[index] = !selectedServers[index]; setSelectedServers([...selectedServers])}}
                      >
                        {server.name}
                      </ToggleButton>
                    </Grid>
                  ))
                }
                <Grid
                  key='Update'
                  item
                >
                  <Button 
                    variant="outlined"
                    onClick={onUpdate}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
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
              <AssetsChartTable
                selectedServerIds={selectedServerIds} />
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
