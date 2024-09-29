import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import Usd from "assets/img/icons/usd.png";
import Btc from "assets/img/icons/btc.jpg";
import Eth from "assets/img/icons/eth.png";
import Matic from "assets/img/icons/matic.png";
import Xfi from "assets/img/icons/xfi.png";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAttachMoney,
  MdAccountBalanceWallet, 
  MdTrendingUp, 
} from "react-icons/md";
import LossProtectionStatus from "views/admin/default/components/LossProtectionStatus";
import XFIRewardsAndStaking from "views/admin/default/components/XFIRewardsAndStaking";
import AlertsNotifications from "views/admin/default/components/AlertsNotifications";
import RiskAssetAllocation from "views/admin/default/components/RiskAssetAllocation";
import SavingsVaults from "views/admin/default/components/SavingsVaults";

const currencyData = {
  USD: { icon: Usd, label: 'USD' },
  BTC: { icon: Btc, label: 'BTC' },
  ETH: { icon: Eth, label: 'ETH' },
  MATIC: { icon: Matic, label: 'MATIC' },
  XFI: { icon: Xfi, label: 'XFI' },
};

export default function UserReports() {
  const [currency, setCurrency] = useState('USD');
  const brandColor = useColorModeValue("brand.500", "white");
  
  const totalValues = {
    USD: '$10,000',
    BTC: '0.25 BTC',
    ETH: '0.5 ETH',
    MATIC: '50 MATIC',
    XFI: '500 XFI',
  };

  const assetBreakdowns = {
    USD: '$10,000',
    BTC: '0.1 BTC',
    ETH: '0.3 ETH',
    MATIC: '5 MATIC',
    XFI: '100 XFI',
  };

  const projectedReturns = {
    USD: '$500',
    BTC: '0.01 BTC',
    ETH: '0.03 ETH',
    MATIC: '5 MATIC',
    XFI: '10 XFI',
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box>
        <Tabs onChange={(index) => setCurrency(['USD', 'BTC', 'ETH', 'MATIC', 'XFI'][index])}>
          <TabList>
            {Object.keys(currencyData).map((currencyType) => (
              <Tab
                key={currencyType}
                _selected={{ 
                  color: 'white', 
                  bg: brandColor, 
                }}
                _hover={{ 
                  bg: 'blue.500', 
                  color: 'white' 
                }}
                borderRadius="md"
                p={4}
              >
                <Flex alignItems="center">
                  <Image boxSize={5} src={currencyData[currencyType].icon} alt={currencyData[currencyType].label} mr={2} />
                  <Text>{currencyData[currencyType].label}</Text>
                </Flex>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {Object.keys(currencyData).map((currencyType) => (
              <TabPanel key={currencyType}>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                  gap='20px'
                  mb='20px'>
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w='56px'
                        h='56px'
                        icon={<Image w='52px' h='52px' src={currencyData[currency].icon} alt="Total Value Icon" />}
                      />
                    }
                    name='Total Value of Vaults'
                    value={totalValues[currency]}
                  />
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w='56px'
                        h='56px'
                        icon={<Image w='52px' h='52px' src={currencyData[currency].icon} alt="Asset Breakdown Icon" />}
                      />
                    }
                    name='Asset Breakdown'
                    value={assetBreakdowns[currency]}
                  />
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w='56px'
                        h='56px'
                        icon={<Image w='52px' h='52px' src={currencyData[currency].icon} alt="Projected Returns Icon" />}
                      />
                    }
                    name='Projected Returns'
                    value={projectedReturns[currency]}
                  />
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>

      <>
      <SimpleGrid 
        columns={{ base: 1, md: 2 }} // 2 columns on medium and larger screens
        spacing={4} // Space between columns
        style={{ gridTemplateColumns: '55% 30% 15%' }} // Custom width for each column
      >
        <SavingsVaults />
        <Box>
          <RiskAssetAllocation />
          <Box mb={2} /> {/* Adds a 10px space */}
          <LossProtectionStatus /> {/* LossProtectionStatus under RiskAssetAllocation */}
        </Box>
        <AlertsNotifications /> {/* AlertsNotifications component in the third column */}
      </SimpleGrid>

      {/* XFIRewardsAndStaking component below the SimpleGrid, taking full width */}
      <Box width="100%" mt={4}> {/* Add margin-top for spacing */}
        <XFIRewardsAndStaking />
      </Box>
    </>

    </Box>
  );
}
