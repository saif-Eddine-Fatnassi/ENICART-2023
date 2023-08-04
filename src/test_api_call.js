import React from 'react';
import axios from 'axios';

const apiUrl = 'http://universities.hipolabs.com/search?country=France';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
    };
  }

  componentDidMount() {
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.status);
        this.setState({ datas: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { datas } = this.state;

    return (
      <div>
        <h1>Universities:</h1>
        <ul>
          {datas.map((university) => (
            <li key={university.id}>{university.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MyComponent;
