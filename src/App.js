import React from 'react';
import {Card} from './card';
import {Modal} from './modal';
import {mockData} from './mock';
import {Pagination} from 'antd';
import './App.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,  // 当前页数
      minValue: 0,  // 当前页面展示的第一条数据
      maxValue: 25,  // 当前页面展示的最后一条数据
      isShow: false, // 是否展示详细信息界面
      showId: undefined  // 展示每条数据详细信息
    }
  }

  handleChange = (value) => {
    if(value <= 1) {
      this.setState({
        current: value,
        minValue: 0,
        maxValue: 25
      })
    } else {
      this.setState({
        current: value,
        minValue: (value - 1) * 25,
        maxValue: (value - 1) * 25 + 25
      })
    }
  }

  handleClick = (id) => {
    this.setState({
      isShow: true,
      showId: id
    })
  }

  handleCancel = () => {
    this.setState({
      isShow: false,
      showId: undefined
    })
  }

  render () {
    const {current, minValue, maxValue, isShow, showId} = this.state;

    return (
      <section className='app'>
        {(mockData.slice(minValue, maxValue) || []).map((d, index) => {
          return (
            <div className='app-block' key={index} onClick={() => this.handleClick(d.id)}>
              <Card num={minValue + index + 1}>
                {d.title}
              </Card>
            </div>
          )
        })}
        <Pagination 
          defaultPageSize={25}
          current={current}
          className='app-page'
          total={mockData.length}
          onChange={this.handleChange} 
        />
        {isShow && 
        <Modal
          id={showId}
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />}
      </section>
    );
  }
}
