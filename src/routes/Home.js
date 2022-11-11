import facade from "../facades/apiFacade";
import React, { useState,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


const Home = () => {

  const init = [
    {
      name: "Loading data...",
      joke: "Loading jokes...",
      answer: false
    }
  ]

  const [jokes, setJokes] = useState(init);

  const [startGame, setStartGame] = useState(false);

  const [ans, setAns] = useState("Joke");

  const [logged, setLogged] = useState(facade.getLog());

  const getJokeQuestions = async () => {
    facade.getJokes().then(joke => {
      const answers = Math.floor(Math.random()*joke.length);
      joke[answers].answer = true;
      let containAns = joke[answers].name;
      setAns(containAns);
      
      setJokes(joke)
    });
  }

  const beginGame = (evt) => {
    getJokeQuestions();
    setStartGame(true);
  }

  const [userAns, setUserAns] = useState(false); 

  const getAnswer = (val) => {
    setUserAns(val);
    console.log(val);
  }

  const checkbox = jokes.map((ele) =>
  <ToggleButton key={ele.name} id={ele.name} value={ele.name} variant={'outline-danger'}>
    {ele.joke}
  </ToggleButton>
  )

  let [score, setScore] = useState(0);

  const checkAnswer = () => {
    const finalAns = jokes.find(ele => ele.name === userAns);
    if(finalAns.answer){
      facade.updateScore(true);
      setScore(score+1);
      getJokeQuestions();

    }
    else{
      facade.updateScore(false);
      setScore(0);
      setStartGame(false);
    }
  }


  return (
    <Container fluid>
      <p>Logged in as : {facade.getUser()} | current score: {score}</p>
      <br />
      {logged ? 
      ( 
      <Container fluid>
        {startGame ? (
          <Container fluid>
            <h2>Which of these jokes is a '{ans}' joke:</h2>
            <br />
            <ToggleButtonGroup vertical={true} size='lg' type="radio" name="radios" value={userAns} onChange={getAnswer}>
                {checkbox}
            </ToggleButtonGroup>
            <br />
            <br />
            <br />
            <Container fluid>
            <Button variant="primary" onClick={checkAnswer}>
                  Pick answer
            </Button>
            </Container>
          </Container>
        ) :
        (
          <Container fluid>
            <h3>Game hasn't started</h3>
            <p>Wan't to start a game?</p>
            <button onClick={beginGame}>Start the game</button>
          </Container>
        )}
      </Container>
      ) : 
      (
        <Container fluid>
          <h2>You have to be logged in to play the game</h2>
          <p>Please go to the log in page to log in.</p>
          <p>
            You can use account( username: user & password: test123 )
            if you dont have and want to make an account.
          </p>
        </Container>
      )}
    </Container>
  )
}

export default Home