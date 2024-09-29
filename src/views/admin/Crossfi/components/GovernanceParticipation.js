import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  SimpleGrid,
  Select,
  Tag,
  TagLabel,
  Tooltip,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import XfiIcon from 'assets/img/icons/xfi.png';
import Card from "components/card/Card";

const GovernanceParticipation = () => {
  // States
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [voteChoice, setVoteChoice] = useState('');
  const [votingHistory, setVotingHistory] = useState([]);
  const [filter, setFilter] = useState('All');
  const [delegateAddress, setDelegateAddress] = useState('');
  const [comments, setComments] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const toast = useToast();

  // User's Voting Power
  const votingPower = 1500; // Example value representing the user's voting power (in $XFI)

  // Example governance proposals
  const proposals = [
    {
      id: 1,
      title: 'Platform Upgrade v1.2',
      description: 'Upgrade platform features and fix bugs.',
      detailedDescription: 'This proposal aims to upgrade the platform to version 1.2. It includes several bug fixes, performance improvements, and new user-friendly features.',
      status: 'Open',
      discussionLink: 'https://discussion.example.com/platform-upgrade',
      stats: {
        votesFor: 12000,
        votesAgainst: 5000,
        votesAbstained: 2000,
      },
    },
    {
      id: 2,
      title: 'Fee Structure Changes',
      description: 'Adjust transaction fees to better serve users.',
      detailedDescription: 'The proposal suggests changes in the transaction fees to make the platform more competitive and user-friendly. The new fee structure will be more beneficial for small transactions.',
      status: 'Closed',
      outcome: 'Approved',
      discussionLink: 'https://discussion.example.com/fee-structure',
      stats: {
        votesFor: 15000,
        votesAgainst: 7000,
        votesAbstained: 3000,
      },
    },
    {
      id: 3,
      title: 'New Staking Pools',
      description: 'Introduce new staking pools for enhanced rewards.',
      detailedDescription: 'This proposal intends to add new staking pools, offering different levels of rewards and lock-up periods to attract more users.',
      status: 'Upcoming',
      discussionLink: 'https://discussion.example.com/new-staking-pools',
    },
  ];

  const handleVote = () => {
    if (!selectedProposal || !voteChoice) {
      toast({
        title: 'Invalid Vote',
        description: 'Please select a proposal and your vote choice.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Log voting action
    console.log(`Voting on proposal ${selectedProposal.title} with choice: ${voteChoice}`);

    // Update voting history
    setVotingHistory([
      ...votingHistory,
      { proposal: selectedProposal.title, choice: voteChoice, date: new Date().toLocaleString() },
    ]);

    // Reset voting options
    setSelectedProposal(null);
    setVoteChoice('');

    onClose();
    toast({
      title: 'Vote Cast',
      description: `Your vote for "${selectedProposal.title}" has been cast.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Delegate Voting Power
  const handleDelegate = () => {
    if (!delegateAddress) {
      toast({
        title: 'Invalid Address',
        description: 'Please enter a valid address to delegate your voting power.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Delegated Successfully',
      description: `Your voting power has been delegated to address: ${delegateAddress}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setDelegateAddress('');
  };

  // Filter Proposals based on status
  const filteredProposals = proposals.filter((proposal) =>
    filter === 'All' ? true : proposal.status === filter
  );

  // Handle Comments
  const handleAddComment = (proposalId, comment) => {
    setComments({ ...comments, [proposalId]: [...(comments[proposalId] || []), comment] });
  };

  return (
    <Card p={6} borderRadius="lg" boxShadow="md" width="100%">
      <VStack align="start" spacing={4}>
        <HStack spacing={2}>
          <Image src={XfiIcon} alt="$XFI Icon" boxSize="40px" />
          <Text fontSize="2xl" fontWeight="bold">
            Governance Participation
          </Text>
        </HStack>
        <Text fontSize="lg">
          Participate in governance by voting on proposals using your $XFI tokens!
        </Text>

        {/* Voting Power */}
        <Box width="100%" mt={2}>
          <HStack>
            <Text fontSize="lg" fontWeight="bold">
              Your Voting Power: {votingPower} $XFI
            </Text>
            <Tooltip label="Your voting power is determined by the number of $XFI tokens you hold and other factors like lock-up periods.">
              <Text color="blue.500" cursor="pointer">
                (Learn More)
              </Text>
            </Tooltip>
          </HStack>
        </Box>

        {/* Delegate Voting Power */}
        <Box width="100%" mt={4}>
          <Text fontSize="lg" fontWeight="bold">Delegate Voting Power</Text>
          <FormControl mt={2}>
            <FormLabel>Delegate Address</FormLabel>
            <Input
              placeholder="Enter address to delegate"
              value={delegateAddress}
              onChange={(e) => setDelegateAddress(e.target.value)}
            />
            <Button mt={2} colorScheme="teal" onClick={handleDelegate}>
              Delegate
            </Button>
          </FormControl>
        </Box>

        {/* Filter Proposals */}
        <Box width="100%" mt={4}>
          <Text fontSize="lg" fontWeight="bold">Filter Proposals</Text>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} mt={2}>
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Upcoming">Upcoming</option>
          </Select>
        </Box>

        {/* Voting Rights - Display Active and Upcoming Proposals */}
        <Box width="100%" mt={4}>
          <Text fontSize="lg" fontWeight="bold">Active and Upcoming Proposals</Text>
          <SimpleGrid columns={1} spacing={4} mt={4}>
            {filteredProposals.map((proposal) => (
              <Box key={proposal.id} p={4} borderWidth={1} borderRadius="md" shadow="sm">
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold">{proposal.title}</Text>
                  <Tag colorScheme={proposal.status === 'Open' ? 'green' : proposal.status === 'Closed' ? 'red' : 'blue'}>
                    <TagLabel>{proposal.status}</TagLabel>
                  </Tag>
                </HStack>
                <Text mt={2}>{proposal.description}</Text>
                <Text mt={2}>
                  <a href={proposal.discussionLink} target="_blank" rel="noopener noreferrer" style={{ color: 'teal' }}>
                    Read Discussion
                  </a>
                </Text>
                <Button mt={2} colorScheme="teal" onClick={() => { setSelectedProposal(proposal); onDetailsOpen(); }}>
                  View Details
                </Button>
                {proposal.status === 'Open' && (
                  <Button mt={2} colorScheme="teal" onClick={() => { setSelectedProposal(proposal); onOpen(); }}>
                    Vote on this Proposal
                  </Button>
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Voting Dashboard - Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Vote on Proposal: {selectedProposal?.title}</ModalHeader>
            <ModalBody>
              <RadioGroup value={voteChoice} onChange={setVoteChoice}>
                <Stack direction="column">
                  <Radio value="For">For</Radio>
                  <Radio value="Against">Against</Radio>
                  <Radio value="Abstain">Abstain</Radio>
                </Stack>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleVote}>
                Submit Vote
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Proposal Details Modal */}
        <Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Details: {selectedProposal?.title}</ModalHeader>
            <ModalBody>
              <Text fontSize="md">{selectedProposal?.detailedDescription}</Text>
              {selectedProposal?.stats && (
                <Box mt={4}>
                  <Text>Votes For: {selectedProposal.stats.votesFor}</Text>
                  <Text>Votes Against: {selectedProposal.stats.votesAgainst}</Text>
                  <Text>Votes Abstained: {selectedProposal.stats.votesAbstained}</Text>
                </Box>
              )}
              <Textarea
                mt={4}
                placeholder="Add a comment about this proposal..."
                onChange={(e) => setComments({ ...comments, newComment: e.target.value })}
              />
              <Button
                mt={2}
                colorScheme="teal"
                onClick={() => handleAddComment(selectedProposal.id, comments.newComment)}
              >
                Add Comment
              </Button>
              <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Comments
                </Text>
                {comments[selectedProposal?.id]?.map((comment, index) => (
                  <Box key={index} mt={2} p={2} borderWidth={1} borderRadius="md">
                    <Text>{comment}</Text>
                  </Box>
                ))}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onDetailsClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Voting History */}
        <Box width="100%" mt={6}>
          <Text fontSize="lg" fontWeight="bold">Voting History</Text>
          {votingHistory.length > 0 ? (
            <SimpleGrid columns={1} spacing={4} mt={4}>
              {votingHistory.map((vote, index) => (
                <Box key={index} p={4} borderWidth={1} borderRadius="md" shadow="sm">
                  <Text>
                    <strong>Proposal:</strong> {vote.proposal}
                  </Text>
                  <Text>
                    <strong>Choice:</strong> {vote.choice}
                  </Text>
                  <Text>
                    <strong>Date:</strong> {vote.date}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text mt={4}>No voting history available.</Text>
          )}
        </Box>
      </VStack>
    </Card>
  );
};

export default GovernanceParticipation;
