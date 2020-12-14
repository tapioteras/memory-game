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

const toIdPair = ({ id, pair }) => id && pair ? `${id}-${pair}` : "not-set"

const generateDeck = (amount: number = 24) => {
  const [cards] = useState([...generateCards(amount)])
  const [flipped1, setFlipped1] = useState(null)
  const [flipped2, setFlipped2] = useState(null)
  return <SimpleGrid columns={6} spacing={4}>
    {cards
      .map((contents, i) =>
        <Box
          key={`card-${i}`}
          bg={[toIdPair(flipped1), toIdPair(flipped2)].includes(toIdPair(contents)) ? "white" : "tomato"}
          height={100}
          width={100}>
            {contents.image}
          <Box padding={2} onClick={() => {
            if (flipped1) {
              setFlipped2(contents)
            } else if (flipped2) {
              setFlipped1(null)
              setFlipped2(null)
            } else {
              setFlipped1(contents)
            }
          }}>
          </Box>
        </Box>)}
  </SimpleGrid>
}

const App = () =>
  <ChakraProvider>
    {generateDeck()}
  </ChakraProvider>

export default App;
