import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Tooltip,
  Button,
  Input,
  Select,
} from '@chakra-ui/react';
import Usd from 'assets/img/icons/usd.png';
import Btc from 'assets/img/icons/btc.jpg';
import Eth from 'assets/img/icons/eth.png';
import Matic from 'assets/img/icons/matic.png';
import Xfi from 'assets/img/icons/xfi.png';
import { Line } from 'react-chartjs-2'; // Chart library for price trends
import Card from "components/card/Card";

// Sample market data
const marketTrendsData = [
  { icon: Xfi, label: '$XFI', price: 1.2, change: '+3.5%', marketCap: '1M', volume: '200K', details: 'XFI is used for governance and staking rewards.' },
  { icon: Btc, label: 'BTC', price: 45000, change: '-1.2%', marketCap: '850B', volume: '25B', details: 'The first decentralized digital currency.' },
  { icon: Eth, label: 'ETH', price: 3000, change: '+2.8%', marketCap: '350B', volume: '15B', details: 'The second-largest cryptocurrency by market cap.' },
  { icon: Matic, label: 'MATIC', price: 1.5, change: '+5.0%', marketCap: '10B', volume: '500M', details: 'Layer 2 scaling solution for Ethereum.' },
];

const marketAnalysisData = [
  { title: 'Lending Rates', value: '4.5%', description: 'Average lending rate across top DeFi platforms.' },
  { title: 'AMM Yields', value: '7.2%', description: 'Average yield from automated market makers.' },
  { title: 'Staking APYs', value: '8.0%', description: 'Average annual percentage yield from staking.' },
];

const RealTimeMarketTrends = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(marketTrendsData);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  }); // Properly initialize chart data
  const [news, setNews] = useState([]); // Placeholder for news data

  // Example of how to fetch news data (use a real API for actual implementation)
  const fetchNews = async () => {
    // Placeholder API call
    const sampleNews = [
      { title: 'Bitcoin Hits New Highs', description: 'Bitcoin has reached a new all-time high...', date: '2024-09-30' },
      { title: 'Ethereum 2.0 Update', description: 'Ethereum’s upgrade is approaching...', date: '2024-09-29' },
    ];
    setNews(sampleNews);
  };

  // Example of how to fetch chart data (use a real API for actual implementation)
  const fetchChartData = () => {
    const data = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [
        {
          label: selectedToken || 'Token Price',
          data: selectedToken ? [1, 1.2, 1.5, 1.3, 1.4] : [], // Placeholder data
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
    setChartData(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [selectedToken]);

  useEffect(() => {
    // Filter tokens based on search query
    const filtered = marketTrendsData.filter((token) => token.label.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredTokens(filtered);
  }, [searchQuery]);

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  return (
    <Card>
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Real-Time Market Trends
        </Text>

        <Flex mb={4} justifyContent="space-between" alignItems="center">
          <Input
            placeholder="Search for a token"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={() => alert(`Downloading data for ${selectedToken}`)}
          >
            Download Data
          </Button>
        </Flex>

        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          {/* DeFi Protocol Data Section */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              DeFi Protocol Data
            </Text>
            <SimpleGrid columns={1} spacing={4}>
              {marketAnalysisData.map((data) => (
                <Box key={data.title} p={3} borderRadius="md" bg="gray.50">
                  <Text fontWeight="bold">{data.title}</Text>
                  <Text fontSize="xl">{data.value}</Text>
                  <Text fontSize="sm" color="gray.600">{data.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
            {/* Placeholder for DeFi charts */}
            <Box mt={4} height="200px" bg="gray.100" borderRadius="md">
              {chartData.labels.length > 0 ? (
                <Line data={chartData} />
              ) : (
                <Text>No data available for the selected token.</Text>
              )}
            </Box>
          </Box>

          {/* Token Price Movements Section */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Token Price Movements
            </Text>

            <Select placeholder="Select token" onChange={handleTokenChange}>
              {filteredTokens.map((token) => (
                <option key={token.label} value={token.label}>{token.label}</option>
              ))}
            </Select>

            <SimpleGrid columns={2} spacing={4} mt={4}>
              {filteredTokens.map((token) => (
                <Tooltip key={token.label} label={token.details} fontSize="md" placement="top">
                  <Flex alignItems="center" bg="gray.50" p={3} borderRadius="md" _hover={{ bg: 'gray.200' }}>
                    <Image src={token.icon} boxSize="30px" alt={`${token.label} icon`} />
                    <Box ml={3}>
                      <Stat>
                        <StatLabel>{token.label}</StatLabel>
                        <StatNumber>${token.price}</StatNumber>
                        <StatHelpText>
                          <Tooltip label={token.change.includes('-') ? 'Decrease' : 'Increase'} aria-label="Change Tooltip">
                            <Text color={token.change.includes('-') ? 'red.500' : 'green.500'}>
                              {token.change}
                            </Text>
                          </Tooltip>
                        </StatHelpText>
                        <StatHelpText fontSize="sm">
                          Market Cap: ${token.marketCap} | Volume: ${token.volume}
                        </StatHelpText>
                      </Stat>
                    </Box>
                  </Flex>
                </Tooltip>
              ))}
            </SimpleGrid>
          </Box>
        </SimpleGrid>

        <Divider my={6} />

        {/* Market Analysis Section */}
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          Market Analysis
        </Text>
        <Text mb={4}>
          Stay updated on the latest trends in the DeFi market to help optimize your vaults.
        </Text>
        <SimpleGrid columns={1} spacing={4}>
          {marketAnalysisData.map((analysis) => (
            <Box key={analysis.title} p={4} borderWidth="1px" borderRadius="md" borderColor="gray.300">
              <Text fontWeight="bold">{analysis.title}</Text>
              <Text fontSize="lg">{analysis.value}</Text>
              <Text color="gray.600">{analysis.description}</Text>
            </Box>
          ))}
        </SimpleGrid>

        <Divider my={6} />

        {/* Recent News Section */}
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          Latest News
        </Text>
        <SimpleGrid columns={1} spacing={4}>
          {news.map((newsItem, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" borderColor="gray.300">
              <Text fontWeight="bold">{newsItem.title}</Text>
              <Text color="gray.600">{newsItem.description}</Text>
              <Text fontSize="sm" color="gray.500">{newsItem.date}</Text>
            </Box>
          ))}
        </SimpleGrid>

        <Divider my={6} />

        {/* Alerts Section */}
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          Price Alerts
        </Text>
        <Text mb={4}>
          Set alerts for significant price changes.
        </Text>
        <Flex>
          <Input placeholder="Enter price threshold" type="number" />
          <Button colorScheme="teal" ml={2}>
            Set Alert
          </Button>
        </Flex>
      </Box>
    </Card>
  );
};

export default RealTimeMarketTrends;
