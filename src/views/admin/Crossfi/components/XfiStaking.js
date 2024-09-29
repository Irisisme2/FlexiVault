import React, { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  HStack,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  SimpleGrid,
} from '@chakra-ui/react';
import XfiIcon from 'assets/img/icons/xfi.png';
import Card from "components/card/Card";

const XfiStaking = () => {
  // States
  const [userBalance, setUserBalance] = useState(1000); // Example balance: 1000 XFI
  const [stakedAmount, setStakedAmount] = useState('');
  const [stakingPool, setStakingPool] = useState('');
  const [rewards, setRewards] = useState(0);
  const [projectedRewards, setProjectedRewards] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const { isOpen: isClaimModalOpen, onOpen: onClaimModalOpen, onClose: onClaimModalClose } = useDisclosure();
  const { isOpen: isReinvestModalOpen, onOpen: onReinvestModalOpen, onClose: onReinvestModalClose } = useDisclosure();
  const toast = useToast();

  // Example staking pools with APY and lock-up periods
  const stakingPools = [
    { id: 1, name: 'Pool A', apy: 10, lockup: '30 days' },
    { id: 2, name: 'Pool B', apy: 15, lockup: '60 days' },
    { id: 3, name: 'Pool C', apy: 20, lockup: '90 days' },
  ];

  useEffect(() => {
    // Calculate projected rewards when stakedAmount or stakingPool changes
    if (stakedAmount && stakingPool) {
      const selectedPool = stakingPools.find(pool => pool.name === stakingPool);
      if (selectedPool) {
        const amount = parseFloat(stakedAmount);
        const annualReward = (amount * selectedPool.apy) / 100;
        setProjectedRewards(annualReward);
      }
    } else {
      setProjectedRewards(0);
    }
  }, [stakedAmount, stakingPool]);

  const handleStake = () => {
    if (!stakedAmount || isNaN(stakedAmount) || stakedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (stakedAmount > userBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You do not have enough $XFI tokens to stake this amount.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log(`Staking ${stakedAmount} $XFI in ${stakingPool}`);

    // Simulate staking action
    setUserBalance(prev => prev - stakedAmount); // Reduce balance after staking
    setHistoricalData([...historicalData, { amount: stakedAmount, pool: stakingPool, rewards }]);
    setRewards(prev => prev + projectedRewards); // Update total rewards

    // Reset fields after staking
    setStakedAmount('');
    setStakingPool('');
    setProjectedRewards(0);

    toast({
      title: "Staked Successfully",
      description: `You have staked ${stakedAmount} $XFI in ${stakingPool}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClaimRewards = () => {
    console.log(`Claiming rewards: ${rewards} $XFI`);
    setUserBalance(prev => prev + rewards); // Add claimed rewards to user balance
    setRewards(0); // Reset rewards after claiming
    onClaimModalClose();

    toast({
      title: "Rewards Claimed",
      description: `You have claimed ${rewards} $XFI in rewards.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleReinvestRewards = () => {
    console.log(`Reinvesting rewards: ${rewards} $XFI`);
    setHistoricalData([...historicalData, { amount: rewards, pool: stakingPool, rewards: 0 }]); // Adding reinvestment to historical
    setRewards(0); // Reset rewards after reinvesting
    onReinvestModalClose();

    toast({
      title: "Rewards Reinvested",
      description: `You have reinvested ${rewards} $XFI in rewards.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card p={6} borderRadius="lg" boxShadow="md" width="100%">
      <VStack align="start" spacing={4}>
        <HStack spacing={2}>
          <Image src={XfiIcon} alt="$XFI Icon" boxSize="40px" />
          <Text fontSize="2xl" fontWeight="bold">
            $XFI Staking
          </Text>
        </HStack>
        <Text fontSize="lg">Stake your $XFI tokens to earn rewards!</Text>

        {/* User Balance Display */}
        <Box mb={4}>
          <Text fontSize="lg" fontWeight="bold">Your Balance:</Text>
          <Text>{userBalance} $XFI</Text>
        </Box>

        {/* Staking Options */}
        <FormControl mb={4}>
          <FormLabel>Amount to Stake ($XFI)</FormLabel>
          <Input
            type="number"
            value={stakedAmount}
            onChange={(e) => setStakedAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Select Staking Pool</FormLabel>
          <Select
            value={stakingPool}
            onChange={(e) => setStakingPool(e.target.value)}
            placeholder="Select a pool"
          >
            {stakingPools.map((pool) => (
              <option key={pool.id} value={pool.name}>
                {pool.name} (APY: {pool.apy}%, Lock-up: {pool.lockup})
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="teal" onClick={handleStake}>
          Stake $XFI
        </Button>

        {/* Projected Rewards Display */}
        <Box mt={4}>
          <Text fontWeight="bold">Projected Rewards:</Text>
          <Text>{projectedRewards.toFixed(2)} $XFI</Text>
        </Box>

        {/* Staking Dashboard */}
        <Box mt={4} width="100%">
          <Stat>
            <StatLabel>Total Staked $XFI</StatLabel>
            <StatNumber>{stakedAmount || 0} $XFI</StatNumber>
            <StatHelpText>
              <StatArrow type={rewards > 0 ? "increase" : "decrease"} />
              {rewards.toFixed(2)} $XFI in rewards
            </StatHelpText>
          </Stat>
          <Button colorScheme="blue" onClick={onClaimModalOpen} disabled={rewards <= 0}>
            Claim Rewards
          </Button>
          <Button
            colorScheme="yellow"
            onClick={onReinvestModalOpen}
            disabled={rewards <= 0}
            ml={2}
          >
            Reinvest Rewards
          </Button>
        </Box>

        {/* Historical Data Display */}
        <Box mt={4} width="100%">
          <Text fontSize="lg" fontWeight="bold">Historical Staking Data</Text>
          <SimpleGrid columns={2} spacing={4}>
            {historicalData.map((entry, index) => (
              <Box key={index} p={3} borderWidth={1} borderRadius="md" shadow="sm">
                <Text>Staked: {entry.amount} $XFI</Text>
                <Text>Pool: {entry.pool}</Text>
                <Text>Rewards: {entry.rewards} $XFI</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>

      {/* Claim Rewards Modal */}
      <Modal isOpen={isClaimModalOpen} onClose={onClaimModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Claim Rewards</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to claim {rewards} $XFI in rewards?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClaimRewards}>
              Claim
            </Button>
            <Button variant="ghost" onClick={onClaimModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reinvest Rewards Modal */}
      <Modal isOpen={isReinvestModalOpen} onClose={onReinvestModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reinvest Rewards</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to reinvest {rewards} $XFI in rewards?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" onClick={handleReinvestRewards}>
              Reinvest
            </Button>
            <Button variant="ghost" onClick={onReinvestModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default XfiStaking;
