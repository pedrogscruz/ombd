import React, {Component} from "react";
import { Input, Layout } from "antd";
import { inject } from "mobx-react";
import { store } from "types/ombd";

import MovieTable from "components/layout/MovieTable";
import MovieInfos from "components/layout/MovieInfos";

const { Header } = Layout;

type state = {
  title: string;
  page: string;
}


@inject('OmbdStore')

class Home extends Component<{OmbdStore?: store}> {
  state:state = {
    title: '',
    page: '1'
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.OmbdStore!.queryQueue("title", e.target.value);

  render() {
    console.log(this.props)
    return (
      <Layout style={{height: '100vh'}}>
        <Header>
          <Input onChange={this.handleInputChange} />
        </Header>
        <MovieTable />
        <MovieInfos/>
      </Layout>
    );
  }
}

export default Home;