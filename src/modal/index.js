import React from "react";
import {Modal as OriginModal} from 'antd';
import './style.css';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: ''
    }
  }
  componentDidMount () {
    const {id} = this.props;
    this.getDetails(id);
  }

  componentWillReceiveProps(next) {
    const {id} = this.props;
    // 每次传入的id改变时，重新调用details接口
    if(id !== next.id && next.id) {
      this.getDetails(next.id);
    }
 
  }

  getDetails = (id) => {
    fetch(`https://zendesk-ticket-viewer-robin.herokuapp.com:443/zendesk/ticket/viewer/ticket?id=${id}`, {
      method:'GET',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      mode:'cors',
      cache:'default'
    })
    .then(res => res.json())
    .catch(err => alert('wow! api err!', err))
    .then((res => {
      this.setState({details: res || []})
    })
    )
  }

  render() {
    const {id, onCancel} = this.props;
    const {details} = this.state;

    return (
      <OriginModal 
        className='tic-modal' 
        onCancel={onCancel}
        footer={<></>}
        {...this.props}>
          <div>{`id is : ${id}`}</div>
          <p>{details}</p>
      </OriginModal>
    );
  }
}
