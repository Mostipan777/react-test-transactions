import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';

const Header = () => {

  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      padding={4}
      bg="blue.400"
      color="white"
    >
      <Flex alignItems="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          Transactions
        </Heading>
      </Flex>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" mr={4}>
          User
        </Text>
        <Button
          size="sm"
          variant="outline"
          color="blue.100"
          borderColor="blue.200"
          _hover={{ bg: 'blue.500', borderColor: 'blue.100' }}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
