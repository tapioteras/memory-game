import * as React from 'react';
import {Box, ChakraProvider, SimpleGrid} from "@chakra-ui/react";

const withCardContents = i => <Box padding={2} onClick={() => alert(i)}>image here</Box>

const generateDeck = (amount: number = 24) =>
  <SimpleGrid columns={6} spacing={4}>
    {Array
      .from(Array(amount), (_, x) => x)
      .map(withCardContents)
      .map((contents, i) =>
        <Box
          key={`card-${i}`}
          bg="tomato"
          height={100}
          width={100}>
          {contents}
        </Box>)}
  </SimpleGrid>

const App = () =>
  <ChakraProvider>
    {generateDeck()}
  </ChakraProvider>

export default App;
