import React, { Component } from "react";
import axios from "axios";
import { getAllTransactions } from "../utils/transactions";
import Nav from "./Nav";

class MyTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      transactions: []
    };
  }
  async componentDidMount() {
    let transactions = await getAllTransactions(this.state.email);
    this.setState({ transactions: transactions[0] });
  }

  displayTrans = transArray => {
    let res =
      transArray &&
      transArray.map(trans => {
        return (
          <tr key={trans.symbol}>
            <td> {trans.symbol}</td>
            <td>{trans.shares}</td>
          </tr>
        );
      });
    return res;
  };
  render() {
    let res = this.displayTrans(this.state.transactions);
    return (
      <div style={{ marginTop: "100px" }}>
        <Nav />
        <h1>My Transactions</h1>
        <div>
          <div>
            <table
              className="datatable"
              style={{
                width: "85vw",
                boxShadow: "4px 4px 5px grey",
                margin: "auto",
                paddingTop: "80px"
              }}
            >
              <thead className="thead-light">
                <tr>
                  <th>Symbol/Ticker</th>
                  <th>Number of Shares</th>
                </tr>
              </thead>
              <tbody>{res}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTransactions;
