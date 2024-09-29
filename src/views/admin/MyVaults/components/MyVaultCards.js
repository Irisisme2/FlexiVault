import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Button,
  IconButton,
  Tooltip,
  useColorModeValue,
  Collapse,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Image,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { InfoIcon, ArrowUpIcon, ArrowDownIcon, RepeatIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import VacationFundIcon from "assets/img/vaults/VacationFund.png";
import EmergencyFundIcon from "assets/img/vaults/EmergencyFund.png";
import CarSavingsIcon from "assets/img/vaults/CarSavings.png"; 
import HouseDownPaymentIcon from "assets/img/vaults/HouseDownPayment.png"; 
import RetirementIcon from "assets/img/vaults/Retirement.png";
import KidsCollegeFundIcon from "assets/img/vaults/KidsCollegeFund.png"; 
import HolidayGiftsFundIcon from "assets/img/vaults/HolidayGiftsFund.png"; 

const initialVaults = [
  {
    name: 'Vacation Fund',
    icon: VacationFundIcon,
    goal: '$10,000 by 2025',
    currentValue: { native: 5000, usd: 4500 },
    growth: { percentage: 5, timeframe: '7 days' },
    riskLevel: 'medium',
    performance: [3000, 3200, 3400, 4500, 4800, 5000],
    transactions: [
      { date: '2024-09-20', type: 'Deposit', amount: 1000, currency: '$XFI' },
      { date: '2024-09-22', type: 'Withdraw', amount: 500, currency: '$XFI' },
      { date: '2024-09-25', type: 'Deposit', amount: 700, currency: '$XFI' },
    ],
  },
  {
    name: 'Emergency Fund',
    icon: EmergencyFundIcon,
    goal: '$15,000 by 2024',
    currentValue: { native: 12000, usd: 11800 },
    growth: { percentage: 2, timeframe: '7 days' },
    riskLevel: 'low',
    performance: [11000, 11300, 11500, 11600, 11800, 12000],
    transactions: [
      { date: '2024-08-15', type: 'Deposit', amount: 2000, currency: '$XFI' },
      { date: '2024-09-10', type: 'Withdraw', amount: 300, currency: '$XFI' },
      { date: '2024-09-18', type: 'Deposit', amount: 1300, currency: '$XFI' },
    ],
  },
  {
    name: 'Car Savings',
    icon: CarSavingsIcon, // Add icon for Car Savings
    goal: '$20,000 by 2026',
    currentValue: { native: 7000, usd: 6900 },
    growth: { percentage: 8, timeframe: '1 month' },
    riskLevel: 'high',
    performance: [5000, 5200, 5300, 6400, 6800, 7000],
    transactions: [
      { date: '2024-07-01', type: 'Deposit', amount: 1000, currency: '$XFI' },
      { date: '2024-07-15', type: 'Deposit', amount: 2000, currency: '$XFI' },
      { date: '2024-09-01', type: 'Withdraw', amount: 1000, currency: '$XFI' },
    ],
  },
  {
    name: 'House Down Payment',
    icon: HouseDownPaymentIcon, // Add icon for House Down Payment
    goal: '$50,000 by 2028',
    currentValue: { native: 15000, usd: 14900 },
    growth: { percentage: 10, timeframe: '3 months' },
    riskLevel: 'medium',
    performance: [10000, 11000, 12000, 14000, 14500, 15000],
    transactions: [
      { date: '2024-06-05', type: 'Deposit', amount: 5000, currency: '$XFI' },
      { date: '2024-07-20', type: 'Deposit', amount: 3000, currency: '$XFI' },
      { date: '2024-09-10', type: 'Withdraw', amount: 100, currency: '$XFI' },
    ],
  },
  {
    name: 'Retirement Fund',
    icon: RetirementIcon,
    goal: '$100,000 by 2040',
    currentValue: { native: 35000, usd: 34800 },
    growth: { percentage: 15, timeframe: '6 months' },
    riskLevel: 'low',
    performance: [25000, 27000, 29000, 31000, 33000, 35000],
    transactions: [
      { date: '2024-01-10', type: 'Deposit', amount: 10000, currency: '$XFI' },
      { date: '2024-04-12', type: 'Deposit', amount: 5000, currency: '$XFI' },
      { date: '2024-08-30', type: 'Deposit', amount: 2000, currency: '$XFI' },
    ],
  },
  {
    name: 'Kids College Fund',
    icon: KidsCollegeFundIcon, // Add icon for Kids College Fund
    goal: '$80,000 by 2035',
    currentValue: { native: 20000, usd: 19800 },
    growth: { percentage: 12, timeframe: '1 year' },
    riskLevel: 'medium',
    performance: [15000, 15500, 16000, 18000, 19000, 20000],
    transactions: [
      { date: '2024-03-10', type: 'Deposit', amount: 8000, currency: '$XFI' },
      { date: '2024-06-15', type: 'Deposit', amount: 5000, currency: '$XFI' },
      { date: '2024-09-10', type: 'Deposit', amount: 2000, currency: '$XFI' },
    ],
  },
  {
    name: 'Holiday Gifts Fund',
    icon: HolidayGiftsFundIcon, // Add icon for Holiday Gifts Fund
    goal: '$5,000 by 2024',
    currentValue: { native: 4000, usd: 3980 },
    growth: { percentage: 3, timeframe: '1 month' },
    riskLevel: 'low',
    performance: [3000, 3200, 3500, 3700, 3900, 4000],
    transactions: [
      { date: '2024-09-01', type: 'Deposit', amount: 1500, currency: '$XFI' },
      { date: '2024-09-15', type: 'Withdraw', amount: 500, currency: '$XFI' },
      { date: '2024-09-25', type: 'Deposit', amount: 1000, currency: '$XFI' },
    ],
  },
];
const MyVaultCards = () => {
  const [vaults, setVaults] = useState(initialVaults);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [isDeposit, setIsDeposit] = useState(true);
  const [isAddVaultOpen, setIsAddVaultOpen] = useState(false);
  
  // New state variables for the new vault form
  const [newVaultName, setNewVaultName] = useState('');
  const [newVaultGoal, setNewVaultGoal] = useState('');
  const [newVaultTargetAmount, setNewVaultTargetAmount] = useState('');
  const [newVaultTargetDate, setNewVaultTargetDate] = useState('');
  const [newVaultRiskLevel, setNewVaultRiskLevel] = useState('medium');
  const [newVaultInvestmentStrategy, setNewVaultInvestmentStrategy] = useState('');
  const [newVaultInitialDeposit, setNewVaultInitialDeposit] = useState('');
  const [newVaultIcon, setNewVaultIcon] = useState(null); // To handle file input

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleTransaction = () => {
    if (!transactionAmount || selectedVaultIndex === null) return;

    const amount = parseFloat(transactionAmount);
    const updatedVaults = [...vaults];
    const selectedVault = updatedVaults[selectedVaultIndex];

    // Handle deposit or withdrawal
    if (isDeposit) {
      selectedVault.currentValue.native += amount;
      selectedVault.currentValue.usd += amount; // Adjust conversion logic as needed
      selectedVault.transactions.push({ date: new Date().toISOString(), type: 'Deposit', amount, currency: 'XFI' });
    } else {
      selectedVault.currentValue.native -= amount;
      selectedVault.currentValue.usd -= amount; // Adjust conversion logic as needed
      selectedVault.transactions.push({ date: new Date().toISOString(), type: 'Withdraw', amount, currency: 'XFI' });
    }

    setVaults(updatedVaults);
    setSelectedVaultIndex(null);
    setTransactionAmount('');
  };

  const handleAddVault = () => {
    if (!newVaultName || !newVaultGoal || !newVaultTargetAmount || !newVaultTargetDate || !newVaultIcon) return;

    const newVault = {
      name: newVaultName,
      icon: newVaultIcon,
      goal: newVaultGoal,
      targetAmount: newVaultTargetAmount,
      targetDate: newVaultTargetDate,
      currentValue: { native: newVaultInitialDeposit || 0, usd: newVaultInitialDeposit || 0 },
      growth: { percentage: 0, timeframe: '' },
      riskLevel: newVaultRiskLevel,
      performance: [],
      transactions: [],
    };

    setVaults([...vaults, newVault]);
    // Reset form fields
    setNewVaultName('');
    setNewVaultGoal('');
    setNewVaultTargetAmount('');
    setNewVaultTargetDate('');
    setNewVaultRiskLevel('medium');
    setNewVaultInvestmentStrategy('');
    setNewVaultInitialDeposit('');
    setNewVaultIcon(null);
    setIsAddVaultOpen(false);
  };

  const chartBackgroundColor = useColorModeValue('rgba(190, 227, 248, 0.6)', 'rgba(144, 205, 244, 0.6)');
  const chartBorderColor = useColorModeValue('#3182ce', '#63b3ed');

  return (
    <>
      <Button colorScheme="teal" onClick={() => setIsAddVaultOpen(true)} mb={4}>
        Add Vault
      </Button>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {vaults.map((vault, index) => (
          <Card
            key={index}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            _hover={{ boxShadow: 'lg', transition: '0.3s' }}
            width="100%"
            cursor="pointer"
          >
            <VStack align="start" spacing={4} width="100%">
              <HStack justifyContent="space-between" width="100%">
                <VStack align="start">
                  <Text fontSize="lg" fontWeight="bold">
                    {vault.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Goal: {vault.goal} - Target Amount: ${vault.targetAmount} by {vault.targetDate}
                  </Text>
                </VStack>
                <IconButton
                  icon={expandedIndex === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  onClick={() => toggleExpand(index)}
                  variant="ghost"
                  aria-label="Expand Vault Details"
                />
              </HStack>
              <HStack width="100%" justifyContent="center">
                <Image src={vault.icon} alt={`${vault.name} icon`} width="500px" height="390px"/>
              </HStack>
              <HStack width="100%" justifyContent="space-between">
                <Box>
                  <Stat>
                    <StatLabel>Current Value</StatLabel>
                    <StatNumber>
                      <Badge colorScheme="green">${vault.currentValue.native} XFI</Badge> (
                      <Badge colorScheme="blue">${vault.currentValue.usd} USD</Badge>)
                    </StatNumber>
                    <StatHelpText>
                      {vault.growth.percentage >= 0 ? (
                        <>
                          <StatArrow type="increase" />
                          +{vault.growth.percentage}%
                        </>
                      ) : (
                        <>
                          <StatArrow type="decrease" />
                          {vault.growth.percentage}%
                        </>
                      )}
                    </StatHelpText>
                  </Stat>
                </Box>
                <Badge colorScheme={vault.riskLevel === 'low' ? 'green' : vault.riskLevel === 'medium' ? 'yellow' : 'red'}>
                  Risk: {vault.riskLevel}
                </Badge>
              </HStack>

              <Box width="100%" height="120px">
                <Line
                  data={{
                    labels: vault.performance.map((_, idx) => `Day ${idx + 1}`),
                    datasets: [
                      {
                        label: 'Performance',
                        data: vault.performance,
                        fill: true,
                        backgroundColor: chartBackgroundColor,
                        borderColor: chartBorderColor,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { mode: 'index', intersect: false },
                    },
                    scales: {
                      x: { display: false },
                      y: { display: true, beginAtZero: false },
                    },
                  }}
                />
              </Box>

              <HStack spacing={4}>
                <Tooltip label="Deposit funds" aria-label="Deposit Tooltip">
                  <Button
                    colorScheme="teal"
                    onClick={() => {
                      setIsDeposit(true);
                      setSelectedVaultIndex(index);
                    }}
                  >
                    Deposit
                  </Button>
                </Tooltip>
                <Tooltip label="Withdraw funds" aria-label="Withdraw Tooltip">
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      setIsDeposit(false);
                      setSelectedVaultIndex(index);
                    }}
                  >
                    Withdraw
                  </Button>
                </Tooltip>
              </HStack>
              <Collapse in={expandedIndex === index}>
                <Divider />
                <Text fontSize="sm" color="gray.600">Transaction History:</Text>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Type</Th>
                      <Th>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {vault.transactions.length > 0 ? (
                      vault.transactions.map((transaction, idx) => (
                        <Tr key={idx}>
                          <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                          <Td>{transaction.type}</Td>
                          <Td>{transaction.amount} XFI</Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={3}>No transactions found.</Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </Collapse>
            </VStack>
          </Card>
        ))}

        {/* Transaction Modal */}
        {selectedVaultIndex !== null && (
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {isDeposit ? 'Deposit' : 'Withdraw'} to {vaults[selectedVaultIndex]?.name}
            </Text>
            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </FormControl>
            <Button mt={4} colorScheme={isDeposit ? 'teal' : 'red'} onClick={handleTransaction}>
              Confirm {isDeposit ? 'Deposit' : 'Withdraw'}
            </Button>
            <Button mt={4} variant="outline" onClick={() => setSelectedVaultIndex(null)}>
              Cancel
            </Button>
          </Box>
        )}
      </SimpleGrid>

      {/* Add Vault Modal */}
      <Modal isOpen={isAddVaultOpen} onClose={() => setIsAddVaultOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Vault</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Vault Name</FormLabel>
              <Input
                value={newVaultName}
                onChange={(e) => setNewVaultName(e.target.value)}
                placeholder="Enter vault name"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Financial Goal</FormLabel>
              <Input
                value={newVaultGoal}
                onChange={(e) => setNewVaultGoal(e.target.value)}
                placeholder="Enter financial goal"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Target Amount</FormLabel>
              <Input
                type="number"
                value={newVaultTargetAmount}
                onChange={(e) => setNewVaultTargetAmount(e.target.value)}
                placeholder="Enter target amount"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Target Date</FormLabel>
              <Input
                type="date"
                value={newVaultTargetDate}
                onChange={(e) => setNewVaultTargetDate(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Risk Preference</FormLabel>
              <Select
                value={newVaultRiskLevel}
                onChange={(e) => setNewVaultRiskLevel(e.target.value)}
                placeholder="Select risk preference"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="custom">Custom</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Investment Strategy</FormLabel>
              <Select
                value={newVaultInvestmentStrategy}
                onChange={(e) => setNewVaultInvestmentStrategy(e.target.value)}
                placeholder="Select investment strategy"
              >
                <option value="staking">Staking</option>
                <option value="yield-farming">Yield Farming</option>
                <option value="stablecoin-heavy">Stablecoin Heavy</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Initial Deposit</FormLabel>
              <Input
                type="number"
                value={newVaultInitialDeposit}
                onChange={(e) => setNewVaultInitialDeposit(e.target.value)}
                placeholder="Enter initial deposit amount"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Vault Icon</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewVaultIcon(reader.result); // Set the icon as a data URL
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {newVaultIcon && (
                <Box mt={2}>
                  <Image src={newVaultIcon} alt="Vault Icon Preview" boxSize="100px" objectFit="cover" />
                </Box>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddVault}>
              Create Vault
            </Button>
            <Button variant="ghost" onClick={() => setIsAddVaultOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyVaultCards;
