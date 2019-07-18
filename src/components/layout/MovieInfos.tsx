import React, {Component} from 'react';
import { inject, observer } from "mobx-react";
import { Modal, Row, Col, Descriptions } from 'antd';
import { store, movie } from "types/ombd";

const { Item } = Descriptions;

@inject('OmbdStore')

@observer
class MovieInfos extends Component<{OmbdStore?: store}> {
  renderContent(selectedMovie: movie) {
    const {Poster, ...restInfos} = selectedMovie, entries = Object.entries(restInfos);
    return (
      <Row gutter={16}>
        <Col span={6}>
          <img alt="example" style={{ width: '100%' }} src={Poster} />
        </Col>
        <Col span={18}>
          <Descriptions>
            {entries.map(([key, value]) => <Item label={key}>{value}</Item>)}
          </Descriptions>
        </Col>
      </Row>
    )
  }
  render() {
    const { selectedMovie } = this.props.OmbdStore!;
    return (
      <Modal
        title={selectedMovie?selectedMovie.Title:''}
        visible={!!selectedMovie}
        onCancel={() => this.props.OmbdStore!.selectedMovie = null}
        footer={null}
      >
        {selectedMovie?this.renderContent(selectedMovie):null}
      </Modal>
    );
  }
}

export default MovieInfos;