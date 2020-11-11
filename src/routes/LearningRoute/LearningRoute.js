import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";

class LearningRoute extends Component {
  state = {
    head: [],
    currGuess: "",
    resp: [],
    displayQ: false,
    totalScore: 0,
    firstVisit:true
  };

  //function to grab the head route only once.
  grabHead = () => {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
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
          head: data,
          totalScore:data.totalScore
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }
  // displays question submission and next question views
  displayQs = () => {
    
    if(this.state.firstVisit === true){
      this.setState({
        firstVisit:false
      })
      this.grabHead()
    }
    
    let data = this.state.head;

    if (this.state.displayQ === false) {
      return (
        <>
          <h2>Translate the phrase:</h2>
          <span>{data.nextWord}</span>
          <p>{`Your total score is: ${data.totalScore}`}</p>
          <main>
            <div className='results'>
            {`You have answered this word correctly ${data.wordCorrectCount} times.`}
            </div>
            <div className='results'>
            {`You have answered this word incorrectly ${data.wordIncorrectCount} times.`}
            </div>
            <form
              onSubmit={(e) => {
                this.handleGuess(e);
              }}
            >
              <label htmlFor="learn-guess-input">
                {`What's the translation for this phrase?`}
              </label>
              <input
                id="learn-guess-input"
                type="text"
                onChange={(e) => {
                  this.grabGuess(e.target.value);
                }}
                required
              ></input>
              <button type="submit">Submit your answer</button>
              <div>{this.displayWrong()}</div>
            </form>
          </main>
        </>
      );
    } else {
      return (
        <>
          
          <main>
            <form
              onSubmit={(e) => {
                this.grabDisplay(e);
              }}
            >

              {this.displayWrong()}
            </form>
          </main>
        </>
      );
    }
  };
  //sends a request to /guess route
  postGuess = (guess) => {
    let theGuess = JSON.stringify({ guess });
    console.log(theGuess);
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: theGuess,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          resp: data,
          totalScore:data.totalScore
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  };
  
  // sets guess value in state for later use
  grabGuess = (val) => {
    this.setState({ currGuess: val });
  };
  //event listener for submitting the guess
  handleGuess = (e) => {
    e.preventDefault();
    let guess = this.state.currGuess;
    let resp = this.state.resp;
    this.postGuess(guess).then(() => {
      if (guess !== resp.answer) {
        this.setState({
          displayQ: true,
          totalScore: this.state.resp.totalScore
        });
      }
    });
  };
  //displays incorrect or correct values if the translation is correct
  displayWrong() {
    if (this.state.displayQ === true) {
      if (this.state.resp.isCorrect === false) {
        return (
          <>
            <main className="DisplayScore">
              <p>{`Your total score is: ${this.state.resp.totalScore}`}</p>
              <h2>Good try, but not quite right :(</h2>
            </main>
            <main className="DisplayFeedback">
              <p>
                {`The correct translation for ${this.state.head.nextWord} was ${this.state.resp.answer} and you chose ${this.state.currGuess}!`}
              </p>
              <button>Try another phrase!</button>
            </main>
          </>
        );
      } else {
        return (
          <>
            <main className="DisplayScore">
              <p>{`Your total score is: ${this.state.resp.totalScore}`}</p>
              <h2>You were correct! :D</h2>
            </main>
            <main className="DisplayFeedback">
              <p>
                {`The correct translation for ${this.state.head.nextWord} was ${this.state.resp.answer} and you chose ${this.state.currGuess}!`}
              </p>
              <button>Try another phrase!</button>
            </main>
          </>
        );
      }
    } else {
      return <></>;
    }
  }
  // sets head state to response of guess in compliance with cypress testing.
  grabDisplay =(e) =>{
    this.state.displayQ = false
    this.setState({
      head:this.state.resp
    })
   
  }

  render() {

    return <section>{this.displayQs()}</section>;
  }
}

export default LearningRoute;
