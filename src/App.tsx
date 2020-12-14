import * as React from 'react';
import {ChakraProvider, Box, SimpleGrid} from "@chakra-ui/react";

const generateDeck = (amount: number = 24) =>
  <SimpleGrid columns={6} spacing={4}>
    {Array.from(Array(amount), (_, x) => x).map((k, i) => <Box key={`card-${i}`} bg="tomato" height={100} width={100}>card {i + 1}</Box>)}
  </SimpleGrid>

const App = () =>
  <ChakraProvider>
    {generateDeck()}
  </ChakraProvider>

export default App;
