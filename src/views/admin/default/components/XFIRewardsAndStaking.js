import React, { useState } from 'react';
import {
  VStack,
  Text,
  Button,
  Badge,
  Box,
  Icon,
  Tooltip,
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
  useToast,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import XfiIcon from 'assets/img/icons/xfi.png'; // Import your XFI icon here

const XFIRewardsAndStaking = () => {
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const toast = useToast();

  // Sample data for rewards
  const [rewardsData, setRewardsData] = useState({
    totalRewards: 1500, // in $XFI
    pendingRewards: 300, // in $XFI
  });

  const handleStakeOpen = () => setIsStakingModalOpen(true);
  const handleStakeClose = () => setIsStakingModalOpen(false);

  const handleStakeSubmit = () => {
    if (stakeAmount <= 0 || stakeAmount > rewardsData.pendingRewards) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsStaking(true);
    setTimeout(() => {
      setRewardsData(prev => ({
        ...prev,
        pendingRewards: prev.pendingRewards - stakeAmount,
      }));
      toast({
        title: "Staking Successful",
        description: `You have staked ${stakeAmount} $XFI.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsStaking(false);
      setStakeAmount('');
      handleStakeClose();
    }, 2000); // Simulating network delay
  };

  const handleClaimRewards = () => {
    setIsClaiming(true);
    setTimeout(() => {
      toast({
        title: "Rewards Claimed",
        description: `You have claimed ${rewardsData.pendingRewards} $XFI.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setRewardsData(prev => ({
        ...prev,
        totalRewards: prev.totalRewards + prev.pendingRewards,
        pendingRewards: 0,
      }));
      setIsClaiming(false);
    }, 2000); // Simulating network delay
  };

  return (
    <Card
      p={4}
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: 'lg', transition: '0.2s' }}
      width="400px"
      height="300px"
    >
      <VStack spacing={4} align="start">
        <Text fontSize="xl" fontWeight="bold">
          CrossFi Chain Rewards
        </Text>
        <Box display="flex" alignItems="center">
          <img src={XfiIcon} alt="XFI Token" style={{ width: '24px', marginRight: '8px' }} />
          <Text fontSize="lg">
            Total Rewards: <Badge colorScheme="green">${rewardsData.totalRewards} $XFI</Badge>
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <img src={XfiIcon} alt="XFI Token" style={{ width: '24px', marginRight: '8px' }} />
          <Text fontSize="lg">
            Pending Rewards: <Badge colorScheme="yellow">${rewardsData.pendingRewards} $XFI</Badge>
            <Tooltip label="Rewards that are waiting to be claimed." placement="top">
              <Icon as={InfoIcon} boxSize={4} color="gray.500" ml={2} />
            </Tooltip>
          </Text>
        </Box>
        
        <Button colorScheme="blue" onClick={handleStakeOpen} isLoading={isStaking}>
          Stake $XFI
        </Button>
        <Button colorScheme="teal" onClick={handleClaimRewards} isLoading={isClaiming} disabled={rewardsData.pendingRewards === 0}>
          Claim Rewards
        </Button>
      </VStack>

      {/* Staking Modal */}
      <Modal isOpen={isStakingModalOpen} onClose={handleStakeClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stake $XFI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Amount to Stake</FormLabel>
              <Input
                type="number"
                placeholder="Enter amount"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleStakeSubmit} isLoading={isStaking}>
              Confirm Stake
            </Button>
            <Button colorScheme="red" onClick={handleStakeClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default XFIRewardsAndStaking;

