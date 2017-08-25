import React from 'react';
import ReactDOM from 'react-dom';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        Hello World!
      </div>
    );
  }
}

ReactDOM.render(<Welcome/>, document.getElementById('app'));
