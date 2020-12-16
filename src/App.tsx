import * as React from 'react';
import {Box, ChakraProvider, Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {useState} from "react";
import {imageNames} from "./cardImageUtil";

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

const getRandomImagePath = () => shuffle(imageNames)[0]

const generateCards = (amount: number) => {
  const withPair = (c, pair: 1 | 2) => ({...c, pair})
  const cards = Array
    .from(Array(amount), (_, x) => x)
    .map((k, i) => ({ id: i + 1, }))
    .map((c) => ({ ...c, image: <img src={getRandomImagePath()} /> }))
  return [
    ...cards.map(c => withPair(c, 1)),
    ...cards.map(c => withPair(c, 2))
  ]
}

const toIdPair = contents => contents?.id && contents?.pair ? `${contents?.id}-${contents?.pair}` : "not-set"

const generateDeck = (amount: number = 24) => {
  const [cards, setCards] = useState(shuffle([...generateCards(amount)]))
  const [flipped1, setFlipped1] = useState(null)
  const [flipped2, setFlipped2] = useState(null)
  const [players, setPlayers] = useState([{id: 1, active: true},{id:2, active: false}])
  const currentPlayerId = players.find((p) => p.active === true).id
  const lastPlayer = players.sort((a,b) => a.id < b.id ? 1 : -1)?.[0]?.id
  const [foundPairs, setFoundPairs] = useState([])
  const scoreCard = players.map(p => ({ id: p.id, gotPairs: foundPairs
      .filter(p2 => p2?.foundByPlayerId === p.id).length }))
  const resetGame = () => {
    setFoundPairs([])
    setCards(shuffle([...generateCards(amount)]))
    setFlipped1(null)
    setFlipped2(null)
  }
  const showWinningPlayer = () => {
    const winningPlayerId = scoreCard.sort((a,b) => a.gotPairs < b.gotPairs ? 1 : -1)?.[0]?.id
    alert(`Player ${winningPlayerId} won!`)
    resetGame()
  }
  const switchTurn = () => {
    if (foundPairs.length < amount) {
      const nextPlayer = currentPlayerId < lastPlayer ? currentPlayerId + 1 : 1
      setPlayers([...players.map(p => ({...p, active: p?.id === nextPlayer }))])
    }
  }
  if (foundPairs.length === amount) {
    showWinningPlayer()
  }
  return <Box margin={5}>
    <Heading>{`Player ${currentPlayerId} turn`}</Heading>
    <Heading size="m">Scores:</Heading>
    <Flex wrap={"wrap"}>
      <Flex direction="column">{scoreCard.map(sc => <Heading size="m">{`Player ${sc.id}: ${sc.gotPairs}`}</Heading>)}</Flex>
    <Flex flexWrap={"wrap"} columns={6} spacing={4}>
    {cards
      .map((contents, i) =>
        <Box margin={4}
          onClick={() => {
            if (!flipped1) {
              setFlipped1(contents)
            } else if (!flipped2) {
              if (flipped1.id === contents.id
                && (flipped1.pair === 1 && contents.pair === 2
                  || flipped1.pair === 2 && contents.pair === 1)) {
                setFoundPairs([...foundPairs, {...contents, foundByPlayerId: currentPlayerId}])
                setFlipped1(null)
                setFlipped2(null)
              } else if(toIdPair(flipped1) === toIdPair(contents)) {
                return
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
    </Flex></Flex></Box>
}

const App = () =>
  <ChakraProvider>
    {generateDeck()}
  </ChakraProvider>

export default App;
