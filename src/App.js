import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-lists/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    //Javascript by default doesn't set scope 'this' on fucntions.
    //this.handleChange = this.handleChange.bind(this);
  }

  //call service using fetch
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) => this.setState({ monsters: user }));
  }

  //binding is required in constructor.
  // handleChange (e) {
  //   this.setState(
  //     {
  //       searchField: e.target.value,
  //     }
  //     //,() => console.log(this.state.searchField)
  //     //callback for seeing immediate value
  //   );
  // }

  handleChanges = (e) => {
    //Best approach to binding event.
    this.setState(
      { searchField: e.target.value }
      // , () =>
      // console.log(this.state.searchField)
    );
  };

  render() {
    const { monsters, searchField } = this.state;
    const filterMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1 className="h1"> Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search Monsters"
          handlechange={this.handleChanges}
        />
        <CardList monsters={filterMonsters} />
      </div>
    );
  }
}
export default App;
