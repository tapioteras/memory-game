import * as React from 'react';
import {ChakraProvider, Box} from "@chakra-ui/react";

const generateDeck = (amount: number = 24) => Array.from(Array(amount), (_,x) => x).map((k, i) => <Box>card {i + 1}</Box>)

const App = () =>
  <ChakraProvider>
    {generateDeck()}
  </ChakraProvider>

export default App;
