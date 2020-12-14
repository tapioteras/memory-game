import * as React from 'react';
import {Box, ChakraProvider, SimpleGrid} from "@chakra-ui/react";
import {useState} from "react";

const generateCards = (amount: number) => {
  const cards = Array
    .from(Array(amount), (_, x) => x)
    .map((k, i) => ({
      id: i + 1,
      image: `image-number-${i + 1}`
    }))
  return [
    ...cards.map((c) => ({...c, pair: 1})),
    ...cards.map((c) => ({...c, pair: 2}))
  ]
}

const generateDeck = (amount: number = 24) => {
  const [cards] = useState([...generateCards(amount)])
  console.log(cards)
  return <SimpleGrid columns={6} spacing={4}>
    {cards
      .map((contents, i) =>
        <Box
          key={`card-${i}`}
          bg="tomato"
          height={100}
          width={100}>
          <Box padding={2} onClick={() => alert(i)}>
            {contents.image}
          </Box>
        </Box>)}
  </SimpleGrid>
}

const App = () =>
  <ChakraProvider>
    {generateDeck()}
  </ChakraProvider>

export default App;
