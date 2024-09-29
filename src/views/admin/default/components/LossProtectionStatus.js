import React, { useState } from 'react';
import {
  VStack,
  Text,
  Badge,
  Box,
  Button,
  Tooltip,
  Icon,
  Select,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack, // Import HStack
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import Btc from "assets/img/icons/btc.jpg";
import Eth from "assets/img/icons/eth.png";
import Matic from "assets/img/icons/matic.png";
import Xfi from "assets/img/icons/xfi.png";
import Usd from "assets/img/icons/usd.png";

const LossProtectionStatus = () => {
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    alertType: '',
    threshold: '',
  });

  const vaults = [
    {
      name: "Vacation Fund",
      currentValue: 8000,
      goal: 15000,
      riskLevel: "Low",
      timeHorizon: "2 Years",
      strategy: "Conservative - Stable Growth",
      assetsDistribution: {
        "Bitcoin (BTC)": { percentage: 20, icon: Btc },
        "Ethereum (ETH)": { percentage: 30, icon: Eth },
        "MATIC": { percentage: 20, icon: Matic },
        "XFI": { percentage: 15, icon: Xfi },
        "Binance Coin (BNB)": { percentage: 15, icon: Usd },
      },
      performanceData: [7000, 7500, 8000, 8500, 9000],
      protectionStatus: "Low volatility detected, assets secured in stablecoins.",
      protectionLevel: 40,
      lastUpdated: "2024-09-28",
      historicalNotes: "Protection increased due to upcoming vacation season.",
      actionableInsights: "Consider reallocating some assets back to higher-risk options.",
      performanceTrend: [30, 35, 40, 50],
    },
    {
      name: "Retirement",
      currentValue: 25000,
      goal: 100000,
      riskLevel: "Medium",
      timeHorizon: "20 Years",
      strategy: "Balanced - Medium Risk Growth",
      assetsDistribution: {
        "Bitcoin (BTC)": { percentage: 40, icon: Btc },
        "Ethereum (ETH)": { percentage: 25, icon: Eth },
        "MATIC": { percentage: 10, icon: Matic },
        "XFI": { percentage: 15, icon: Xfi },
        "Binance Coin (BNB)": { percentage: 10, icon: Usd },
      },
      performanceData: [20000, 22000, 25000, 27000, 30000],
      protectionStatus: "Moderate volatility detected, partial shift to safer assets.",
      protectionLevel: 60,
      lastUpdated: "2024-09-27",
      historicalNotes: "Shifts made to reduce exposure as market fluctuates.",
      actionableInsights: "Monitor closely for any market recovery signs.",
      performanceTrend: [55, 60, 58, 60],
    },
    {
      name: "Investment Growth",
      currentValue: 30000,
      goal: 50000,
      riskLevel: "High",
      timeHorizon: "10 Years",
      strategy: "Aggressive - High Growth",
      assetsDistribution: {
        "Bitcoin (BTC)": { percentage: 35, icon: Btc },
        "Ethereum (ETH)": { percentage: 25, icon: Eth },
        "MATIC": { percentage: 15, icon: Matic },
        "XFI": { percentage: 15, icon: Xfi },
        "Binance Coin (BNB)": { percentage: 10, icon: Usd },
      },
      performanceData: [25000, 27000, 30000, 33000, 36000],
      protectionStatus: "Market stable, assets are actively managed.",
      protectionLevel: 30,
      lastUpdated: "2024-09-26",
      historicalNotes: "Investments are performing well; risk remains balanced.",
      actionableInsights: "Explore new growth opportunities in emerging assets.",
      performanceTrend: [20, 25, 30, 32],
    },
    {
      name: "Emergency Fund",
      currentValue: 12000,
      goal: 20000,
      riskLevel: "Low",
      timeHorizon: "5 Years",
      strategy: "Highly Conservative - Quick Access",
      assetsDistribution: {
        "Bitcoin (BTC)": { percentage: 10, icon: Btc },
        "Ethereum (ETH)": { percentage: 20, icon: Eth },
        "MATIC": { percentage: 30, icon: Matic },
        "XFI": { percentage: 20, icon: Xfi },
        "Binance Coin (BNB)": { percentage: 20, icon: Usd },
      },
      performanceData: [10000, 10500, 11000, 11500, 12000],
      protectionStatus: "High volatility detected, assets moved to stablecoins.",
      protectionLevel: 80,
      lastUpdated: "2024-09-29",
      historicalNotes: "Funds moved to stablecoins in light of recent market drops.",
      actionableInsights: "No action needed; maintain current allocation.",
      performanceTrend: [75, 80, 82, 80],
    },
  ];

  const selectedVault = vaults[selectedVaultIndex];

  const handleAlertModalOpen = () => setIsAlertModalOpen(true);
  const handleAlertModalClose = () => setIsAlertModalOpen(false);

  const handleAlertSubmit = () => {
    console.log("Alert set for", selectedVault.name, "with details:", alertDetails);
    handleAlertModalClose();
  };

  return (
    <VStack md="20px" spacing={4} align="start" width="100%">
      <Card
        p={4}
        borderRadius="lg"
        boxShadow="md"
        _hover={{ boxShadow: 'lg', transition: '0.2s' }}
        width="680px"
        height="460px"
      >
        {/* Tabs for specific vaults */}
        <Tabs variant="enclosed" mb={4}>
          <TabList>
            {vaults.map((vault, index) => (
              <Tab key={index} onClick={() => setSelectedVaultIndex(index)}>
                {vault.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {vaults.map((vault, index) => (
              <TabPanel key={index}>
                <VStack spacing={3} align="start">
                  <Text fontSize="lg" fontWeight="bold">{vault.name}</Text>
                  <Text fontSize="md">
                    <Badge colorScheme={getProtectionColorScheme(vault.protectionStatus)}>
                      {vault.protectionStatus}
                    </Badge>
                    <Tooltip label="Current protection status for your vault." placement="top">
                      <Icon as={InfoIcon} boxSize={4} color="gray.500" ml={2} />
                    </Tooltip>
                  </Text>

                  <Text fontSize="sm" color="gray.500">Last Updated: {vault.lastUpdated}</Text>
                  <Text fontSize="sm" fontStyle="italic" color="gray.600">{vault.historicalNotes}</Text>
                  <Text fontSize="sm" fontWeight="bold">Insights:</Text>
                  <Text fontSize="sm">{vault.actionableInsights}</Text>

                  <Text fontSize="sm" fontWeight="bold">Assets:</Text>
                  <SimpleGrid columns={2} spacing={1} width="full">
                    {Object.entries(vault.assetsDistribution).map(([asset, { percentage, icon }], idx) => (
                      <Box key={idx} display="flex" alignItems="center">
                        <img src={icon} alt={asset} style={{ width: '20px', marginRight: '8px' }} />
                        <Text fontSize="sm">{asset}: {percentage}%</Text>
                      </Box>
                    ))}
                  </SimpleGrid>

                  {/* Action buttons side by side */}
                  <HStack spacing={2} mt={4}>
                    <Button size="sm" colorScheme="blue" variant="outline" onClick={handleAlertModalOpen}>
                      Set Alert
                    </Button>
                    <Button size="sm" colorScheme="green" variant="outline">
                      Manage Vault
                    </Button>
                  </HStack>
                </VStack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Card>

      {/* Alert Modal */}
      <Modal isOpen={isAlertModalOpen} onClose={handleAlertModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Alert for {selectedVault.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Alert Type</FormLabel>
              <Select 
                placeholder="Select alert type" 
                onChange={(e) => setAlertDetails({ ...alertDetails, alertType: e.target.value })}
              >
                <option value="Protection Level">Protection Level</option>
                <option value="Performance Threshold">Performance Threshold</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Threshold</FormLabel>
              <Input 
                type="number" 
                placeholder="Enter threshold value" 
                onChange={(e) => setAlertDetails({ ...alertDetails, threshold: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAlertSubmit}>
              Set Alert
            </Button>
            <Button colorScheme="red" onClick={handleAlertModalClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

// Function to determine badge color based on protection status
const getProtectionColorScheme = (status) => {
  if (status.includes('High')) return 'red'; // High protection needed
  if (status.includes('Moderate')) return 'yellow'; // Moderate protection
  if (status.includes('Low')) return 'green'; // Low protection
  return 'gray'; // Default
};

export default LossProtectionStatus;
