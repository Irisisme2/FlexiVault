import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Button,
  Image,
  Input,
  Spinner,
} from '@chakra-ui/react';
import Card from "components/card/Card";
import Usd from 'assets/img/icons/usd.png';
import Btc from 'assets/img/icons/btc.jpg';
import Eth from 'assets/img/icons/eth.png';
import Matic from 'assets/img/icons/matic.png';
import Xfi from 'assets/img/icons/xfi.png';
import { Line } from 'react-chartjs-2';

// Sample data for portfolio adjustments
const portfolioAdjustmentsData = [
  {
    title: 'Rebalance Portfolio',
    description: 'Consider reallocating your assets to mitigate risks during high volatility periods. Moving some funds into stablecoins can help maintain the value of your investment.',
    recommendation: 'Move 20% of your crypto to stablecoins (e.g., USDC, DAI).',
    riskLevel: 'Medium',
    performance: 'Stable in the last 30 days, but markets are showing signs of volatility.',
    icon: Usd,
    historicalData: [1, 1.1, 1.2, 1.1, 1.05, 1.07, 1.08], // Sample historical data
    projections: [1.08, 1.09, 1.1, 1.11, 1.12, 1.13, 1.15], // Sample future projections
  },
  {
    title: 'Explore Higher Yielding Assets',
    description: 'In favorable market conditions, consider increasing your exposure to high-yielding assets. This can boost your returns while market trends are positive.',
    recommendation: 'Increase your holdings in $MATIC and $XFI by 15%.',
    riskLevel: 'High',
    performance: 'Grew by 15% last week, making it an attractive investment opportunity.',
    icon: Matic,
    historicalData: [1.2, 1.3, 1.5, 1.4, 1.6, 1.7, 1.8], // Sample historical data
    projections: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4], // Sample future projections
  },
];

// Sample data for new protocols to explore
const newProtocolsData = [
  {
    name: 'New AMM Protocol',
    apy: '12.5%',
    riskLevel: 'High',
    recentPerformance: 'Strong growth over the last month, outpacing many competitors.',
    description: 'A new automated market maker with innovative liquidity provision mechanisms.',
    icon: Eth,
    resourceLink: 'https://example.com/new-amms', // External resource link
  },
  {
    name: 'Lending Pool A',
    apy: '8.0%',
    riskLevel: 'Medium',
    recentPerformance: 'Consistent returns with lower risk over the past quarter.',
    description: 'A reliable lending platform with a good track record.',
    icon: Btc,
    resourceLink: 'https://example.com/lending-pool-a', // External resource link
  },
];

const SuggestedOptimizations = () => {
  const [loading, setLoading] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Simulating a data fetch
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  const handleSetAlert = () => {
    alert(`Alert set for threshold: $${alertThreshold}`);
    setAlertThreshold(''); // Reset after setting alert
  };

  const handleFeedbackSubmit = () => {
    alert(`Feedback submitted: ${feedback}`);
    setFeedback(''); // Reset feedback after submission
  };

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Suggested Optimizations
        </Text>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            {/* Portfolio Adjustments Section */}
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Portfolio Adjustments
            </Text>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4} mb={6}>
              {portfolioAdjustmentsData.map((item, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md" borderColor="gray.300">
                  <Flex alignItems="center">
                    <Image src={item.icon} boxSize="30px" alt={`${item.title} icon`} />
                    <Text fontWeight="bold" ml={3}>{item.title}</Text>
                  </Flex>
                  <Text mt={2}>{item.description}</Text>
                  <Text fontWeight="bold" mt={2}>Recommendation:</Text>
                  <Text>{item.recommendation}</Text>
                  <Stat mt={2}>
                    <StatLabel>Risk Level</StatLabel>
                    <StatNumber>{item.riskLevel}</StatNumber>
                    <StatHelpText>{item.performance}</StatHelpText>
                  </Stat>

                  {/* Historical Data Visualization */}
                  <Box mt={4} height="300px">
                    <Text fontWeight="bold">Historical Performance</Text>
                    <Line
                      data={{
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
                        datasets: [
                          {
                            label: 'Historical Data',
                            data: item.historicalData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            pointRadius: 4,
                          },
                          {
                            label: 'Projected Data',
                            data: item.projections,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            pointRadius: 4,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      height={100}
                    />
                  </Box>

                  {/* Execute Recommendation Button */}
                  <Button colorScheme="teal" mt={4} onClick={() => alert(`Recommendation executed for: ${item.title}`)}>
                    Execute Recommendation
                  </Button>
                  <Button variant="outline" mt={2} onClick={() => alert(`Learn more about ${item.title}`)}>
                    Learn More
                  </Button>
                </Box>
              ))}
            </SimpleGrid>

            <Divider my={6} />

            {/* New Protocols to Explore Section */}
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              New Protocols to Explore
            </Text>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
              {newProtocolsData.map((protocol, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md" borderColor="gray.300">
                  <Flex alignItems="center">
                    <Image src={protocol.icon} boxSize="30px" alt={`${protocol.name} icon`} />
                    <Text fontWeight="bold" ml={3}>{protocol.name}</Text>
                  </Flex>
                  <Text fontSize="lg" fontWeight="bold" mt={2}>APY: {protocol.apy}</Text>
                  <Stat mt={2}>
                    <StatLabel>Risk Level</StatLabel>
                    <StatNumber>{protocol.riskLevel}</StatNumber>
                    <StatHelpText>{protocol.recentPerformance}</StatHelpText>
                  </Stat>
                  <Text mt={2}>{protocol.description}</Text>
                  <Button colorScheme="teal" mt={4} onClick={() => window.open(protocol.resourceLink, '_blank')}>
                    Explore This Protocol
                  </Button>
                  <Button variant="outline" mt={2} onClick={() => alert(`Learn more about ${protocol.name}`)}>
                    Learn More
                  </Button>
                </Box>
              ))}
            </SimpleGrid>

            <Divider my={6} />

            {/* Alerts Section */}
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Set Alerts
            </Text>
            <Flex mb={4}>
              <Input
                placeholder="Enter price threshold"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
              />
              <Button colorScheme="teal" onClick={handleSetAlert}>
                Set Alert
              </Button>
            </Flex>

            {/* User Feedback Section */}
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Feedback
            </Text>
            <Input
              placeholder="Provide your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button colorScheme="teal" mt={2} onClick={handleFeedbackSubmit}>
              Submit Feedback
            </Button>

            <Divider my={6} />

            {/* Summary Section */}
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Summary
            </Text>
            <Text>
              Regularly optimizing your portfolio based on market conditions and exploring new protocols can enhance your investment strategy. Stay proactive and adjust your investments to maximize returns while managing risks.
            </Text>
          </>
        )}
      </Box>
    </Card>
  );
};

export default SuggestedOptimizations;
