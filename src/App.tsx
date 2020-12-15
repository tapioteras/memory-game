import * as React from 'react';
import {Box, ChakraProvider, Heading, SimpleGrid} from "@chakra-ui/react";
import {useState} from "react";

const generateCards = (amount: number) => {
  const withPair = (c, pair: 1 | 2) => ({...c, pair})
  const cards = Array
    .from(Array(amount), (_, x) => x)
    .map((k, i) => ({
      id: i + 1,
    }))
  return [
    ...cards.map(c => withPair(c, 1)),
    ...cards.map(c => withPair(c, 2))
  ].map((c) => ({ ...c, image: `image-number-${c.id}-pair-${c.pair}` }))
}

const toIdPair = contents => contents?.id && contents?.pair ? `${contents?.id}-${contents?.pair}` : "not-set"

const shuffle = (a) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const generateDeck = (amount: number = 24) => {
  const [cards] = useState(shuffle([...generateCards(amount)]))
  const [flipped1, setFlipped1] = useState(null)
  const [flipped2, setFlipped2] = useState(null)
  const [players, setPlayers] = useState([{id: 1, active: true},{id:2, active: false}])
  const currentPlayerId = players.find((p) => p.active === true).id
  const lastPlayer = players.sort((a,b) => a.id < b.id ? 1 : -1)?.[0]?.id
  const [foundPairs, setFoundPairs] = useState([])
  const scoreCard = players.map(p => ({ id: p.id, gotPairs: foundPairs
      .filter(p2 => p2?.foundByPlayerId === p.id).length }))
  const switchTurn = () => {
    const nextPlayer = currentPlayerId < lastPlayer ? currentPlayerId + 1 : 1
    setPlayers([...players.map(p => ({...p, active: p?.id === nextPlayer }))])
  }
  return <React.Fragment>
    <Heading>{`Player ${currentPlayerId} turn`}</Heading>
    <Heading>Scores:</Heading>
    {scoreCard.map(sc => <Box>Player {sc.id}: {sc.gotPairs}</Box>)}
    <SimpleGrid columns={6} spacing={4}>
    {cards
      .map((contents, i) =>
        <Box
          onClick={() => {
            if (!flipped1) {
              setFlipped1(contents)
            } else if (!flipped2) {
              if (flipped1.id === contents.id) {
                setFlipped1(null)
                setFlipped2(null)
                setFoundPairs([...foundPairs, {...contents, foundByPlayerId: currentPlayerId}])
              } else {
                setFlipped2(contents)
              }
            } else {
              setFlipped1(null)
              setFlipped2(null)
              switchTurn()
            }
          }}
          key={`card-${i}`}
          bg={[toIdPair(flipped1), toIdPair(flipped2)].includes(toIdPair(contents))
          || foundPairs.some(fp => fp.id === contents?.id)
            ? "white"
            : "tomato"
          }
          height={100}
          width={100}>
          <Box padding={2}>
            {!foundPairs.some(fp => fp.id === contents?.id)
            && [toIdPair(flipped1), toIdPair(flipped2)].includes(toIdPair(contents))
            && contents.image}
          </Box>
        </Box>)}
  </SimpleGrid></React.Fragment>
}

const App = () =>
  <ChakraProvider>
    {generateDeck()}
  </ChakraProvider>

export default App;
