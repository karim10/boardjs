import React from "react";
import Column from "./Column";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [],
      cards: []
    };
  }

  getCard(id) {
    return this.state.cards.find(card => card.id === id);
  }

  updateCards(cardId, columnId) {
    const card = this.getCard(cardId);
    const cardIndex = this.state.cards.findIndex(c => c.id === cardId);
    let newCards = this.state.cards;
    newCards.splice(cardIndex, 1, { ...card, state: columnId });
    this.setState({
      cards: newCards
    });
  }

  getUser(userId) {
    return this.state.users.find(user => user.id === userId);
  }

  getCardsByColumn(column) {
    if (this.state.filter !== null) {
      return this.state.cards.filter(card => {
        return card.state === column.id && card.userId === this.state.filter;
      });
    } else {
      return this.state.cards.filter(card => {
        return card.state === column.id;
      });
    }
  }

  componentDidMount() {
    fetch("https://api.myjson.com/bins/l2yvo")
      .then(response => response.json())
      .then(data => {
        this.setState(data);
      });
  }

  render() {
    return (
      <div>
        <div style={boardStyles}>
          {this.state.columns.map(column => {
            return (
              <Column
                key={column.id}
                column={column}
                cards={this.getCardsByColumn(column)}
                updateCards={this.updateCards.bind(this)}
                getUser={this.getUser.bind(this)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const boardStyles = {
  borderStyle: "solid",
  borderWidth: "5px",
  borderColor: "green",
  display: "inline-block",
  height: window.innerHeight - 100 + "px"
};

export default Board;
