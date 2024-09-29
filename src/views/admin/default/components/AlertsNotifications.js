import React from 'react';
import { Box, VStack, Text, Badge, } from '@chakra-ui/react';
import Card from 'components/card/Card';

// Sample alert and notification data relevant to FlexiVault
const alerts = [
  {
    id: 1,
    title: 'Market Volatility Alert',
    message: 'BTC has fluctuated by more than 5% in the last 24 hours. Consider reviewing your asset allocation.',
    type: 'warning',
  },
  {
    id: 2,
    title: 'Risk Level Change',
    message: 'Your retirement fund risk level has changed to Medium. Adjust your investment strategy accordingly.',
    type: 'info',
  },
  {
    id: 3,
    title: 'Staking Reward Update',
    message: 'You have earned 10% staking rewards on your assets this month. Check your rewards dashboard.',
    type: 'success',
  },
  {
    id: 4,
    title: 'Investment Performance Notification',
    message: 'Your Vacation Fund has surpassed its current value by 20%. Great job!',
    type: 'success',
  },
];

const AlertsNotifications = () => {
  return (
    <VStack spacing={4} align="center">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          width="150px"
          borderRadius="lg"
          boxShadow="md"
          p={3}
          _hover={{ boxShadow: 'lg', transition: '0.2s' }}
          bg={alert.type === 'warning' ? 'yellow.100' : alert.type === 'success' ? 'green.100' : 'blue.100'}
        >
          <Text fontSize="sm" fontWeight="bold">{alert.title}</Text>
          <Text fontSize="xs">{alert.message}</Text>
          <Badge mt={2} colorScheme={alert.type === 'warning' ? 'yellow' : alert.type === 'success' ? 'green' : 'blue'}>
            {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
          </Badge>
        </Card>
      ))}
    </VStack>
  );
};

export default AlertsNotifications;
