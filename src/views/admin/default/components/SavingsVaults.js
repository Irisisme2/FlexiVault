import React, { useState } from 'react';
import {
  SimpleGrid,
  Box,
  Text,
  Button,
  Badge,
  VStack,
  Image,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Input,
  Progress,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import Card from 'components/card/Card';
import { Line } from 'react-chartjs-2';
import { useDisclosure } from '@chakra-ui/react';
import VacationFundIcon from "assets/img/vaults/VacationFund.png";
import RetirementIcon from "assets/img/vaults/Retirement.png";
import EmergencyFundIcon from "assets/img/vaults/EmergencyFund.png";
import InvestmentGrowthIcon from "assets/img/vaults/InvestmentGrowth.png";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Legend);

const currencyRates = {
  ETH: 2000,
  BTC: 30000,
  XFI: 1,
  MATIC: 1,
  USD: 1,
};

const SavingsVaults = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVault, setSelectedVault] = useState(null);
  const [actionType, setActionType] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [vaultCurrencies, setVaultCurrencies] = useState({});

  // Sample vault data
  const [vaults, setVaults] = useState([
    {
      name: "Vacation Fund",
      currentValue: 5000,
      growthPercentage: 15,
      riskLevel: "Low",
      totalDeposits: 4500,
      goal: 8000,
      description: "Save for your next vacation.",
      performanceData: [1000, 2000, 3000, 4000, 5000],
      icon: VacationFundIcon,
    },
    {
      name: "Retirement",
      currentValue: 20000,
      growthPercentage: 30,
      riskLevel: "Medium",
      totalDeposits: 15000,
      goal: 50000,
      description: "Long-term savings.",
      performanceData: [10000, 12000, 15000, 18000, 20000],
      icon: RetirementIcon,
    },
    {
      name: "Emergency Fund",
      currentValue: 10000,
      growthPercentage: 5,
      riskLevel: "Low",
      totalDeposits: 8000,
      goal: 12000,
      description: "Savings for emergencies.",
      performanceData: [5000, 6000, 7000, 8000, 10000],
      icon: EmergencyFundIcon,
    },
    {
      name: "Investment Growth",
      currentValue: 15000,
      growthPercentage: 20,
      riskLevel: "High",
      totalDeposits: 10000,
      goal: 30000,
      description: "Investments for growth.",
      performanceData: [8000, 9000, 10000, 12000, 15000],
      icon: InvestmentGrowthIcon,
    },
  ]);

  const getChartData = (data) => ({
    labels: ['1M', '2M', '3M', '4M', '5M'],
    datasets: [
      {
        label: 'Growth Over Time',
        data: data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  const handleOpenModal = (vault, type) => {
    setSelectedVault(vault);
    setAmount('');
    setActionType(type);
    onOpen();
  };

  const handleCurrencyChange = (event, vaultName) => {
    const newCurrency = event.target.value;
    setVaultCurrencies(prevState => ({
      ...prevState,
      [vaultName]: newCurrency,
    }));
  };

  const convertToSelectedCurrency = (value, currency) => {
    return value / currencyRates[currency];
  };

  const handleActionConfirm = () => {
    let updatedVaults = [...vaults];
    const vaultIndex = updatedVaults.findIndex(vault => vault.name === selectedVault.name);
    let updatedVault = { ...selectedVault };

    const numericAmount = parseFloat(amount) * currencyRates[selectedCurrency];

    if (actionType === 'Deposit') {
      updatedVault.currentValue += numericAmount;
      updatedVault.totalDeposits += numericAmount;
    } else if (actionType === 'Withdraw') {
      if (numericAmount > updatedVault.totalDeposits) {
        alert("Withdrawal amount exceeds total deposits.");
        return;
      }
      updatedVault.currentValue -= numericAmount;
      updatedVault.totalDeposits -= numericAmount;
    } else if (actionType === 'Rebalance') {
      updatedVault.currentValue *= 1.1; // Increase by 10%
    }

    updatedVaults[vaultIndex] = updatedVault;
    setVaults(updatedVaults);
    setAmount('');
    onClose();
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
        {vaults.map((vault, index) => {
          const vaultCurrency = vaultCurrencies[vault.name] || 'USD';
          return (
            <Card key={index} p={2} width="390px" borderRadius="lg" boxShadow="md" _hover={{ boxShadow: 'lg', transition: '0.2s' }}>
              <VStack spacing={1} align="center" gap="20px">
                <Image boxSize="240px" width="370px" height="300px" borderRadius="lg" src={vault.icon} alt={vault.name} />
                <Text fontSize="sm" fontWeight="bold" textAlign="center">{vault.name}</Text>

                <Select value={vaultCurrency} onChange={(e) => handleCurrencyChange(e, vault.name)} size="xs" mb={2}>
                  <option value="USD">USD</option>
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                  <option value="XFI">XFI</option>
                  <option value="MATIC">MATIC</option>
                </Select>

                <Tabs variant="soft-rounded" colorScheme="teal" size="sm">
                  <TabList>
                    <Tab fontSize="xs">Overview</Tab>
                    <Tab fontSize="xs">Deposits</Tab>
                    <Tab fontSize="xs">Withdrawals</Tab>
                    <Tab fontSize="xs">Performance</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Text textAlign="center" fontSize="xs">Current: ${convertToSelectedCurrency(vault.currentValue, vaultCurrency).toFixed(2)} {vaultCurrency}</Text>
                      <Text textAlign="center" fontSize="xs">Deposits: ${convertToSelectedCurrency(vault.totalDeposits, vaultCurrency).toFixed(2)} {vaultCurrency}</Text>
                      <Text textAlign="center" fontSize="xs" fontStyle="italic">{vault.description}</Text>
                      <Text textAlign="center" fontSize="xs">
                        Growth: <Badge colorScheme="green">{vault.growthPercentage}%</Badge>
                      </Text>
                      <Text textAlign="center" fontSize="xs">Risk: <Badge colorScheme={vault.riskLevel === "Low" ? "green" : vault.riskLevel === "Medium" ? "yellow" : "red"}>{vault.riskLevel}</Badge></Text>
                      <Box width="100%">
                        <Text textAlign="center" mb={1} fontSize="xs">Progress: ${convertToSelectedCurrency(vault.currentValue, vaultCurrency).toFixed(2)} / ${convertToSelectedCurrency(vault.goal, vaultCurrency).toFixed(2)} {vaultCurrency}</Text>
                        <Progress value={(vault.currentValue / vault.goal) * 100} colorScheme="teal" size="sm" />
                      </Box>
                    </TabPanel>

                    <TabPanel>
                      <Tooltip label="Add funds to this vault" aria-label="Add funds">
                        <Button colorScheme="blue" size="xs" onClick={() => handleOpenModal(vault, 'Deposit')}>Deposit</Button>
                      </Tooltip>
                    </TabPanel>

                    <TabPanel>
                      <Tooltip label="Withdraw funds from this vault" aria-label="Withdraw funds">
                        <Button colorScheme="red" size="xs" onClick={() => handleOpenModal(vault, 'Withdraw')}>Withdraw</Button>
                      </Tooltip>
                    </TabPanel>

                    <TabPanel>
                      <Box h="100px" w="100%">
                        <Line data={getChartData(vault.performanceData)} options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                              ticks: {
                                fontSize: 8,
                              },
                            },
                          },
                        }} />
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Modal for Vault Details */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedVault?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm"><strong>Current Value:</strong> ${convertToSelectedCurrency(selectedVault?.currentValue, selectedCurrency).toFixed(2)} {selectedCurrency}</Text>
            <Text fontSize="sm"><strong>Total Deposits:</strong> ${convertToSelectedCurrency(selectedVault?.totalDeposits, selectedCurrency).toFixed(2)} {selectedCurrency}</Text>
            <Text fontSize="sm"><strong>Growth %:</strong> {selectedVault?.growthPercentage}%</Text>
            <Text fontSize="sm"><strong>Risk Level:</strong> {selectedVault?.riskLevel}</Text>
            <Text fontSize="sm"><strong>Description:</strong> {selectedVault?.description}</Text>
            <Text mt={2} fontSize="sm"><strong>Select Currency:</strong></Text>
            <Select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} size="sm">
              <option value="USD">USD</option>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="XFI">XFI</option>
              <option value="MATIC">MATIC</option>
            </Select>
            <Box mt={2}>
              <Input 
                placeholder={`Enter amount to ${actionType.toLowerCase()} in ${selectedCurrency}`} 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                min="0"
                size="sm"
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" size="sm" onClick={handleActionConfirm}>Confirm {actionType}</Button>
            <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SavingsVaults;
