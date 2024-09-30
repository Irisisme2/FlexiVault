import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Divider,
  Select,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Card from "components/card/Card";

const AnalyticsAndReports = () => {
  // Sample data for historical performance
  const historicalData = {
    labels: ['1 Day', '1 Week', '1 Month', '3 Months', '6 Months', '1 Year'],
    values: [1000, 1200, 1300, 1400, 1800, 2000],
  };

  // Sample data for performance by asset
  const assetData = {
    labels: ['$XFI', '$BTC', '$ETH', '$MATIC', '$LTC', '$BNB'],
    values: [200, 150, 300, 100, 50, 200],
  };

  // Updated vault comparison data with specified names
  const vaultsData = [
    {
      name: 'Vacation Fund',
      description: 'A fund dedicated to saving for vacations and travel experiences.',
      riskAdjustedReturn: '10%',
      fees: '$5',
      liquidityPerformance: 'High',
      historicalValues: [1000, 1100, 1150, 1200, 1300, 1400],
    },
    {
      name: 'Emergency Fund',
      description: 'Savings set aside for unexpected emergencies.',
      riskAdjustedReturn: '8%',
      fees: '$3',
      liquidityPerformance: 'Medium',
      historicalValues: [500, 520, 530, 540, 550, 560],
    },
    {
      name: 'Car Savings',
      description: 'Savings to purchase or maintain a car.',
      riskAdjustedReturn: '6%',
      fees: '$2',
      liquidityPerformance: 'High',
      historicalValues: [700, 720, 740, 760, 780, 800],
    },
    {
      name: 'House Down Payment',
      description: 'Savings to secure a down payment on a house.',
      riskAdjustedReturn: '12%',
      fees: '$10',
      liquidityPerformance: 'Medium',
      historicalValues: [2000, 2100, 2200, 2300, 2400, 2500],
    },
    {
      name: 'Retirement Fund',
      description: 'Long-term savings for retirement.',
      riskAdjustedReturn: '9%',
      fees: '$8',
      liquidityPerformance: 'High',
      historicalValues: [3000, 3100, 3200, 3300, 3400, 3500],
    },
    {
      name: 'Kids College Fund',
      description: 'Savings to cover educational expenses for children.',
      riskAdjustedReturn: '11%',
      fees: '$7',
      liquidityPerformance: 'Medium',
      historicalValues: [1500, 1550, 1600, 1650, 1700, 1750],
    },
    {
      name: 'Holiday Gifts Fund',
      description: 'Savings set aside for holiday gifts and celebrations.',
      riskAdjustedReturn: '5%',
      fees: '$1',
      liquidityPerformance: 'Low',
      historicalValues: [300, 320, 330, 340, 350, 360],
    },
  ];

  // Sample fee breakdown data
  const feesData = [
    { type: 'Platform Fee', amount: '$10' },
    { type: 'Transaction Cost', amount: '$2' },
    { type: 'DeFi Protocol Fee', amount: '$5' },
  ];

  // State to manage selected time frame for historical data
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1 Month');
  const [alertVisible, setAlertVisible] = useState(false);

  // Function to handle time frame change
  const handleTimeFrameChange = (e) => {
    setSelectedTimeFrame(e.target.value);
    // Update historicalData based on selectedTimeFrame if needed
  };

  const handleDownloadReport = () => {
    // Simulate report download
    alert('Report downloaded successfully!');
    setAlertVisible(true);
  };

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Analytics & Reports
        </Text>

        {/* Alert for Successful Actions */}
        {alertVisible && (
          <Alert status="success" mb={4} onClose={() => setAlertVisible(false)}>
            <AlertIcon />
            Your action was successful!
          </Alert>
        )}

        {/* Portfolio Performance Overview */}
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          Portfolio Performance Overview
        </Text>

        {/* Historical Data Section */}
        <Box mb={6} height="300px">
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Historical Data
          </Text>
          <Select
            placeholder="Select Time Frame"
            value={selectedTimeFrame}
            onChange={handleTimeFrameChange}
            mb={4}
          >
            <option value="1 Day">1 Day</option>
            <option value="1 Week">1 Week</option>
            <option value="1 Month">1 Month</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
          </Select>
          <Line
            data={{
              labels: historicalData.labels,
              datasets: [
                {
                  label: 'Total Portfolio Value',
                  data: historicalData.values,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  pointRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={200}
          />
        </Box>

        {/* Performance by Asset Section */}
        <Box mb={6} height="300px">
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Performance by Asset
          </Text>
          <Bar
            data={{
              labels: assetData.labels,
              datasets: [
                {
                  label: 'Asset Performance',
                  data: assetData.values,
                  backgroundColor: 'rgba(153, 102, 255, 0.6)',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={200}
          />
          <Text mt={2} fontSize="sm" color="gray.500">
            The performance of each asset reflects its return over the selected period.
          </Text>
        </Box>

        {/* Comparison of Vaults Section */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Comparison of Vaults
          </Text>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
            {vaultsData.map((vault, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.300"
                bg="white"
                boxShadow="md"
                height="500px" // Adjusted height of the vault card
              >
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                  {vault.name}
                </Text>
                <Text mb={4}>{vault.description}</Text>
                <Stat>
                  <StatLabel>Risk-Adjusted Return</StatLabel>
                  <StatNumber>{vault.riskAdjustedReturn}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Fees</StatLabel>
                  <StatNumber>{vault.fees}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Liquidity Performance</StatLabel>
                  <StatNumber>{vault.liquidityPerformance}</StatNumber>
                </Stat>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Historical Values: {vault.historicalValues.join(', ')}
                </Text>
                <Box height="150px"> {/* Adjusted height for the chart */}
                  <Line
                    data={{
                      labels: historicalData.labels,
                      datasets: [
                        {
                          label: `${vault.name} Performance`,
                          data: vault.historicalValues,
                          borderColor: 'rgba(75, 192, 192, 1)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          pointRadius: 4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                    height={150} // Adjusted height of the chart
                  />
                </Box>
                <Button
                  mt={2}
                  onClick={() => alert(`Learn more about ${vault.name}`)}
                >
                  Learn More
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Fee Breakdown Section */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Fee Breakdown
          </Text>
          <SimpleGrid columns={1} spacing={4}>
            {feesData.map((fee, index) => (
              <Flex
                key={index}
                justifyContent="space-between"
                borderWidth="1px"
                p={2}
                borderRadius="md"
                borderColor="gray.300"
                bg="white"
                boxShadow="md"
              >
                <Text>{fee.type}</Text>
                <Text fontWeight="bold">{fee.amount}</Text>
              </Flex>
            ))}
          </SimpleGrid>
          <Text mt={4} fontWeight="bold">
            Total Fees: ${feesData.reduce((total, fee) => total + parseFloat(fee.amount.slice(1)), 0).toFixed(2)}
          </Text>
          <Button colorScheme="blue" mt={2} onClick={handleDownloadReport}>
            Download Report
          </Button>
        </Box>

        <Divider my={6} />

        {/* Insights Section */}
        <Box mb={6}>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Insights
          </Text>
          <Text>
            Regular monitoring and analysis of your portfolio can help you make informed decisions. Consider rebalancing your assets based on their performance and the current market conditions.
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default AnalyticsAndReports;

