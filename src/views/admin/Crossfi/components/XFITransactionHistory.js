import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Select,
  Divider,
  Tooltip,
  Flex,
  IconButton,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Line } from 'react-chartjs-2'; // Ensure you install chart.js and react-chartjs-2
import XfiIcon from 'assets/img/icons/xfi.png';
import Card from "components/card/Card";

const XFITransactionHistory = () => {
  // Sample Transaction Data
  const transactions = [
    { id: 1, type: 'Deposit', amount: 500, date: '2024-09-01 12:30 PM', details: 'First deposit into FlexiVault' },
    { id: 2, type: 'Withdrawal', amount: 200, date: '2024-09-05 02:45 PM', details: 'Emergency fund withdrawal' },
    { id: 3, type: 'Deposit', amount: 300, date: '2024-09-10 09:00 AM', details: 'Savings for vacation' },
    { id: 4, type: 'FlexiVault Yield', amount: 50, date: '2024-09-15 11:00 AM', details: 'Yield from investment' },
    { id: 5, type: 'Deposit', amount: 700, date: '2024-09-20 10:15 AM', details: 'Monthly savings' },
    { id: 6, type: 'Withdrawal', amount: 400, date: '2024-09-25 03:30 PM', details: 'Funds for bills' },
    { id: 7, type: 'FlexiVault Yield', amount: 80, date: '2024-09-28 05:00 PM', details: 'Yield from investment' },
  ];

  // Sample Rewards Data
  const rewards = [
    { id: 1, source: 'Staking Rewards', amount: 120, date: '2024-09-01 12:00 PM', details: 'Staking rewards from pools' },
    { id: 2, source: 'Governance Participation', amount: 80, date: '2024-09-08 04:00 PM', details: 'Participation in governance votes' },
    { id: 3, source: 'Vault Returns', amount: 150, date: '2024-09-12 06:00 PM', details: 'Returns from vault investments' },
    { id: 4, source: 'Referral Bonus', amount: 30, date: '2024-09-15 07:00 PM', details: 'Referral program earnings' },
  ];

  // State Management
  const [transactionType, setTransactionType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const totalPages = Math.ceil(transactions.length / pageSize);
  const toast = useToast();

  // Filter Transactions
  const filteredTransactions = transactions.filter(transaction => {
    const date = new Date(transaction.date);
    const isTypeMatch = transactionType ? transaction.type === transactionType : true;
    const isSearchMatch = transaction.amount.toString().includes(searchTerm);
    const isDateMatch =
      (!startDate || new Date(startDate) <= date) &&
      (!endDate || new Date(endDate) >= date);
    
    return isTypeMatch && isSearchMatch && isDateMatch;
  });

  // Paginated Transactions
  const paginatedTransactions = filteredTransactions.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  // Total Calculations
  const totalDeposits = transactions
    .filter(transaction => transaction.type === 'Deposit')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
    
  const totalWithdrawals = transactions
    .filter(transaction => transaction.type === 'Withdrawal')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalRewards = rewards.reduce((acc, reward) => acc + reward.amount, 0);

  // Chart Data
  const chartData = {
    labels: transactions.map(transaction => transaction.date.split(' ')[0]), // Grouping by date
    datasets: [
      {
        label: 'Total Deposits',
        data: transactions.map(transaction => transaction.type === 'Deposit' ? transaction.amount : 0),
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
      {
        label: 'Total Withdrawals',
        data: transactions.map(transaction => transaction.type === 'Withdrawal' ? transaction.amount : 0),
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
    ],
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <>
      <Card p={6} borderRadius="lg" boxShadow="md" width="100%">
        <VStack align="start" spacing={4}>
          <HStack spacing={2}>
            <Image src={XfiIcon} alt="$XFI Icon" boxSize="40px" />
            <Text fontSize="2xl" fontWeight="bold">
              $XFI Transaction History
            </Text>
          </HStack>
          <Text fontSize="lg">
            View the history of your deposits, withdrawals, and rewards earned in $XFI.
          </Text>

          {/* Summary Section */}
          <Box width="100%" p={4} bg="gray.50" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Summary</Text>
            <HStack spacing={6}>
              <Text>Total Deposits: <b>{totalDeposits} $XFI</b></Text>
              <Text>Total Withdrawals: <b>{totalWithdrawals} $XFI</b></Text>
              <Text>Total Rewards: <b>{totalRewards} $XFI</b></Text>
            </HStack>
          </Box>

          {/* Filter Section */}
          <Flex justify="space-between" align="center" width="100%" mt={4}>
            <HStack spacing={4}>
              <Select
                placeholder="Filter by Type"
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="FlexiVault Yield">FlexiVault Yield</option>
              </Select>
              <Input
                placeholder="Search Amount"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FormControl>
                <FormLabel htmlFor="start-date" fontSize="sm">Start Date</FormLabel>
                <Input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="end-date" fontSize="sm">End Date</FormLabel>
                <Input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack>
              <Button colorScheme="blue" onClick={() => toast({ title: "Export feature not implemented.", status: "info", duration: 2000, isClosable: true })}>
                Export CSV
              </Button>
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                isDisabled={currentPage === 0}
                aria-label="Previous Page"
              />
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                isDisabled={currentPage >= totalPages - 1}
                aria-label="Next Page"
              />
            </HStack>
          </Flex>

          {/* Transaction History Table */}
          <Box width="100%" mt={8}>
            <Text fontSize="lg" fontWeight="bold">Deposit & Withdrawal History</Text>
            <TableContainer mt={4}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Transaction Type</Th>
                    <Th>Amount ($XFI)</Th>
                    <Th>Date & Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedTransactions.map((transaction) => (
                    <Tr key={transaction.id} onClick={() => handleTransactionClick(transaction)} _hover={{ cursor: 'pointer', bg: 'gray.100' }}>
                      <Td>
                        <Tooltip label={`Details: ${transaction.details}`} placement="top">
                          <Text>{transaction.type}</Text>
                        </Tooltip>
                      </Td>
                      <Td>{transaction.amount}</Td>
                      <Td>{transaction.date}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          {/* CrossFi Rewards Summary */}
          <Box width="100%" mt={8}>
            <Text fontSize="lg" fontWeight="bold">CrossFi Rewards Summary</Text>
            <TableContainer mt={4}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Reward Source</Th>
                    <Th>Amount Earned ($XFI)</Th>
                    <Th>Date & Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rewards.map((reward) => (
                    <Tr key={reward.id}>
                      <Td>
                        <Tooltip label={`Details: ${reward.details}`} placement="top">
                          <Text>{reward.source}</Text>
                        </Tooltip>
                      </Td>
                      <Td>{reward.amount}</Td>
                      <Td>{reward.date}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          {/* Transaction Chart */}
          <Box width="100%" mt={8}>
            <Text fontSize="lg" fontWeight="bold">Transaction Overview</Text>
            <Line data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
          </Box>

          {/* Transaction Details Modal */}
          <Modal isOpen={!!selectedTransaction} onClose={() => setSelectedTransaction(null)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Transaction Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedTransaction && (
                  <>
                    <Text fontWeight="bold">Type: {selectedTransaction.type}</Text>
                    <Text>Amount: {selectedTransaction.amount} $XFI</Text>
                    <Text>Date & Time: {selectedTransaction.date}</Text>
                    <Text>Details: {selectedTransaction.details}</Text>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={() => setSelectedTransaction(null)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      </Card>
    </>
  );
};

export default XFITransactionHistory;
