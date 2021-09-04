import * as React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Header from './components/Header';
import Demo from './components/Table';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Demo />
  </ChakraProvider>
);
