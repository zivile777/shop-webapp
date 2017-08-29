import React from 'react';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectValue: [],
      filteredData: [],
      user_id: [],
    };
    this.filterTable = this.filterTable.bind(this);
  };

  componentDidMount () {
    this.getTableContents();
  }

  handleChange(data, index, e) {
    console.log('data ', data, e.target.value);
    let selectValue = this.state.selectValue;
    selectValue = e.target.value;

    //during setState I invoke callback function to update order data
    //TODO: to ensure that component rerenders after fetching POST data
    this.setState({ selectValue, user_id: data._id }, () => { this.changeOrderState(); });
  }

  //this function allows to search and filter the table contents
  //for simplicity,  now it filters through names, technicians, appointments, emails and order status
  //TODO: sort by order status etc
  filterTable(event) {
    let filteredData = this.state.data;
    filteredData = filteredData.filter((data) => {
      return data.name.concat(data.technician, data.appt_type, data.email, data.order_state).toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });

    this.setState({ filteredData: filteredData });
  }

  //this function is grabbing the data and we are saving it in state
  getTableContents () {
    //if you want to access local data, use url http://localhost:1337/items
    return fetch('https://enigmatic-headland-61720.herokuapp.com/api/users') //fetching users
    .then(response => response.json())
    .then((responseJson) =>
      this.setState({
        data: responseJson,
        filteredData: responseJson,
      })
    ).catch(() => {
      console.log('error fetching data');
      this.setState({
        data: [],
        filteredData: [],
      });
    });
  }

  //this function updates the information of order_state
  changeOrderState () {
    let url = 'https://enigmatic-headland-61720.herokuapp.com/api/users/' + this.state.user_id;
    event.preventDefault();
    const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_state: this.state.selectValue }),
        };
    return fetch(url, options)
    .then(response => response.json())
    .then(responseJson =>
      this.setState({
        data: responseJson,
        filteredData: responseJson,
      }))
      .catch(() => {
        this.setState({
          selectValue: [],
        });
      });
  }

  render () {
    const data = this.state.filteredData;

    let row = data.map((data, i) =>
    <tr key={i} className={data.order_state}>
      <td key={data.name}>{data.name}</td>
      <td key={data.technician}>{data.technician}</td>
      <td key={data.order_date}>{data.order_date}</td>
      <td key={data.appt_type}>{data.appt_type}</td>
      <td key={data.phone}>{data.phone}</td>
      <td key={data.email}>{data.email}</td>
      <td key={data.order_state}>
        <select
          data-id={data._id}
          defaultValue={data.order_state}
          onChange={this.handleChange.bind(this, data, i)}
        >
        <option value='In Progress'>In Progress</option>
        <option value='Done'>Done</option>
        <option value='Cancelled'>Cancelled</option>
        </select>
      </td>
    </tr>
    );
    return (
      <div className="nav-container">
        <nav className="navbar">
    			<div className="nav-div">
    				<ul className="nav-ul">
    					<li className="nav-item">
    						<a className="home" href="#"></a>
    					</li>
    					<li className="nav-item">
    						<a className="inbox" href="#"></a>
    					</li>
    					<li className="nav-item">
    						<a className="calendar" href="#"></a>
    					</li>
              <input className="input form-control" type="text" id='filter'
                onChange={this.filterTable}
                placeholder="Search by Name, Technician, Email, Appointment or Order Status"/>
    					<li className="nav-item">
    						<a className="profile nav-link" href="#"></a>
    					</li>
    				</ul>
    		</div>
    	</nav>
        <div>
          <table id="table" className="table border">
            <thead className="thead">
              <tr>
                <th>Name</th>
                <th>Technician</th>
                <th>Order Date</th>
                <th>Appt. Type</th>
                <th>Cell Number</th>
                <th>Email</th>
                <th>Order State</th>
              </tr>
            </thead>
            <tbody>{row}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

module.exports = Main;
