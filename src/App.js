import "./App.css";
import { Component } from "react";
import CardList from "./components/Card-List/card-list.component";
import SearchBox from "./components/Search-Box/search-box-component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const res = response.json();
        return res;
      })
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (Event) => {
    const searchField = Event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const monsterFilter = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox
          className="monster-search-box"
          handleSearch={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={monsterFilter} />
      </div>
    );
  }
}

export default App;
