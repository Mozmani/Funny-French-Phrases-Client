import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";

// Dashboard route
class DashboardRoute extends Component {
  state = {
    language: "",
    words: [],
  };
  //Fetches the users word list and language
  componentDidMount() {
    return fetch(`${config.REACT_APP_API_BASE}/language`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          language: data.language,
          words: data.words,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }
  //Lists the words language and their amount of times correct
  listWords() {
    let language = this.state.language.name;
    return this.state.words.map((item, idx) => {
      return (
        <li key={idx}>
          <p>{language}</p>
          <h4>{item.original}</h4>
          <p>{`correct answer count: ${item.correct_count}`}</p>
          <p>{`incorrect answer count: ${item.incorrect_count}`}</p>
        </li>
      );
    });
  }

  render() {
    let language = this.state.language.name;
    let score = this.state.language.total_score;

    return (
      <section>
        <h2>{`Your Language: ${language}`}</h2>
        <p>{`Total correct answers: ${score}`}</p>
        <main>
          <a href="/learn">Start practicing</a>
          <h3>Phrases to practice</h3>
          <ul>{this.listWords()}</ul>
        </main>
      </section>
    );
  }
}

export default DashboardRoute;
