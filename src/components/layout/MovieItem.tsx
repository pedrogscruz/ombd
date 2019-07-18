import React, {Component} from 'react';
import { inject } from "mobx-react";
import { Card } from 'antd';
import { movie, store } from "types/ombd";

const { Meta } = Card;

type IProps = {
  movie: movie;
}

@inject('OmbdStore')

class MovieTable extends Component<{OmbdStore?: store} & IProps> {
  handleCardClick = () => this.props.OmbdStore!.selectedMovie = this.props.movie;

  render() {
    const { movie } = this.props, { Poster, Title, Year } = movie;
    return (
      <Card
        hoverable
        style={{
          width: 240,
          display: 'inline-block',
          maxHeight: '430px',
          minHeight: '430px',
          verticalAlign: 'middle'
        }}
        cover={<img src={Poster} />}
        onClick={this.handleCardClick}
      >
        <Meta title={Title} description={Year} />
      </Card>
    );
  }
}

export default MovieTable;