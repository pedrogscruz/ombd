import React, {Component, Fragment} from 'react';
import { inject, observer } from "mobx-react";
import { Layout, Pagination } from 'antd';
import { store } from "types/ombd";
import MovieItem from "components/layout/MovieItem";

const { Content, Footer } = Layout;

@inject('OmbdStore')

@observer
class MovieTable extends Component<{OmbdStore?: store}> {
  handlePaginationChange = (value: number) => this.props.OmbdStore!.queryQueue("page", value.toString());
  render() {
    const {OmbdStore} = this.props;
    return (
      <Fragment>
        <Content style={{overflowY: 'auto'}}>
          {OmbdStore!.result.map((movie, index) => <MovieItem key={`movie_${index}`} movie={movie} />)}
        </Content>
        <Footer>
          <Pagination
            simple
            defaultCurrent={1}
            total={OmbdStore!.total}
            onChange={this.handlePaginationChange}
          />
        </Footer>
      </Fragment>
    );
  }
}

export default MovieTable;