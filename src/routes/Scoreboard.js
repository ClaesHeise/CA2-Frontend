import Table from 'react-bootstrap/Table';
import React, { useState,useEffect } from "react";
import facade from "../facades/apiFacade";
import Container from 'react-bootstrap/Container';

const Scoreboard = () => {
  const init = [
    {
      username: "Loading data...",
      highscore: 0
    }
  ]
  const [highscores, setHighscores] = useState(init);

  useEffect(() => {
    facade.getHighscores().then(data => setHighscores(data));
  },[]);

  // Mapper
  const tableRow = highscores.map((ele, index) =>
    <tr key={ele.username}>
      <td>{index+1}</td>
      <td>{ele.username}</td>
      <td>{ele.highscore}</td>
    </tr>
  )

  return (
    <Container fluid>
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Highscore</th>
          </tr>
        </thead>
        <tbody>
          {tableRow}
        </tbody>
    </Table>
    </Container>
  )
}

export default Scoreboard