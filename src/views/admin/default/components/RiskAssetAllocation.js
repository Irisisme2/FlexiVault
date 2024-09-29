import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Badge,
  Progress,
  HStack,
  SimpleGrid,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Select,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const RiskAssetAllocation = () => {
  const vaults = [
    {
      name: "Vacation Fund",
      currentValue: 8000,
      goal: 15000,
      riskLevel: "Low",
      timeHorizon: "2 Years",
      strategy: "Conservative - Stable Growth",
      assetsDistribution: {
        "Bitcoin (BTC)": 20,
        "Ethereum (ETH)": 30,
        "MATIC": 20,
        "XFI": 15,
        "Binance Coin (BNB)": 15,
      },
      performanceData: [7000, 7500, 8000, 8500, 9000],
    },
    {
      name: "Retirement",
      currentValue: 25000,
      goal: 100000,
      riskLevel: "Medium",
      timeHorizon: "20 Years",
      strategy: "Balanced - Medium Risk Growth",
      assetsDistribution: {
        "Bitcoin (BTC)": 40,
        "Ethereum (ETH)": 25,
        "MATIC": 10,
        "XFI": 15,
        "Binance Coin (BNB)": 10,
      },
      performanceData: [20000, 22000, 25000, 27000, 30000],
    },
    {
      name: "Emergency Fund",
      currentValue: 12000,
      goal: 20000,
      riskLevel: "Low",
      timeHorizon: "5 Years",
      strategy: "Highly Conservative - Quick Access",
      assetsDistribution: {
        "Bitcoin (BTC)": 10,
        "Ethereum (ETH)": 20,
        "MATIC": 30,
        "XFI": 20,
        "Binance Coin (BNB)": 20,
      },
      performanceData: [10000, 10500, 11000, 11500, 12000],
    },
    {
      name: "Investment Growth",
      currentValue: 30000,
      goal: 50000,
      riskLevel: "High",
      timeHorizon: "10 Years",
      strategy: "Aggressive - High Growth",
      assetsDistribution: {
        "Bitcoin (BTC)": 35,
        "Ethereum (ETH)": 25,
        "MATIC": 15,
        "XFI": 15,
        "Binance Coin (BNB)": 10,
      },
      performanceData: [25000, 27000, 30000, 33000, 36000],
    },
  ];

  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const selectedVault = vaults[selectedVaultIndex];

  // Function to get the color scheme based on risk level
  const getRiskColorScheme = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return 'green';
      case 'Medium':
        return 'yellow';
      case 'High':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Data for the Pie Chart for each vault
  const pieData = {
    labels: Object.keys(selectedVault.assetsDistribution),
    datasets: [
      {
        label: 'Assets Allocation',
        data: Object.values(selectedVault.assetsDistribution),
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)',  // Bitcoin - orange
          'rgba(75, 192, 192, 0.6)',  // Ethereum - teal
          'rgba(153, 102, 255, 0.6)', // MATIC - purple
          'rgba(255, 206, 86, 0.6)',  // XFI - yellow
          'rgba(54, 162, 235, 0.6)',  // Binance Coin - blue
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Line chart data for performance over time
  const lineData = {
    labels: ['1M', '2M', '3M', '4M', '5M'],
    datasets: [
      {
        label: 'Performance Over Time',
        data: selectedVault.performanceData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Card height="800px" width="500px" mx="auto">
      <VStack spacing={6} width="full">
        {/* Dropdown to select a vault */}
        <Select
          placeholder="Select Vault"
          value={selectedVaultIndex}
          onChange={(e) => setSelectedVaultIndex(Number(e.target.value))}
          maxW="300px"
        >
          {vaults.map((vault, index) => (
            <option key={index} value={index}>
              {vault.name}
            </option>
          ))}
        </Select>

        {/* Card for selected vault */}
        <Card p={4} width="full" borderRadius="lg" boxShadow="md" _hover={{ boxShadow: 'lg', transition: '0.2s' }}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>{selectedVault.name}</Text>

          <Tabs variant="soft-rounded" colorScheme="teal" size="sm">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Performance</Tab>
              <Tab>Risk Analysis</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing={4} align="center">
                  <Text fontSize="md"><strong>Current Value:</strong> ${selectedVault.currentValue}</Text>
                  <Text fontSize="md"><strong>Goal:</strong> ${selectedVault.goal}</Text>
                  <Text fontSize="md">Time Horizon: {selectedVault.timeHorizon}</Text>
                  <Text fontSize="md">Investment Strategy: {selectedVault.strategy}</Text>
                  <Text fontSize="md">Risk Level:
                    <Badge ml={2} colorScheme={getRiskColorScheme(selectedVault.riskLevel)}>{selectedVault.riskLevel}</Badge>
                  </Text>

                  {/* Progress Bar */}
                  <Box width="100%">
                    <Text textAlign="center" fontSize="sm" mb={1}>
                      Progress: ${selectedVault.currentValue} / ${selectedVault.goal}
                    </Text>
                    <Progress value={(selectedVault.currentValue / selectedVault.goal) * 100} colorScheme="teal" size="sm" />
                  </Box>

                  {/* Pie Chart for Asset Distribution */}
                  <Box width="100%" maxWidth="300px" mx="auto">
                    <Pie data={pieData} options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }} />
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                {/* Performance Analysis - Line Chart */}
                <Box width="100%" height="300px">
                  <Line data={lineData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          fontSize: 10,
                        },
                      },
                    },
                  }} />
                </Box>
              </TabPanel>

              <TabPanel>
                {/* Risk Analysis */}
                <VStack spacing={4} align="center">
                  <Text fontSize="md" fontWeight="bold">Risk Analysis</Text>
                  <Text>Risk Level:
                    <Badge ml={2} colorScheme={getRiskColorScheme(selectedVault.riskLevel)}>{selectedVault.riskLevel}</Badge>
                  </Text>
                  <Text>Investment Strategy: {selectedVault.strategy}</Text>
                  <Text>Asset Distribution:</Text>
                  <SimpleGrid columns={2} spacing={4}>
                    {Object.entries(selectedVault.assetsDistribution).map(([asset, percentage], index) => (
                      <HStack key={index} justify="space-between" width="full">
                        <Text>{asset}</Text>
                        <Text>{percentage}%</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
      </VStack>
    </Card>
  );
};

export default RiskAssetAllocation;
