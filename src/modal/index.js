import React from "react";
import {Modal as OriginModal} from 'antd';
import './style.css';

export class Modal extends React.Component {
  render() {
    const {id, onCancel} = this.props;
    return (
      <OriginModal 
        className='tic-modal' 
        onCancel={onCancel}
        footer={<></>}
        {...this.props}>
          <div>{`id is : ${id}`}</div>
          <p>对话框的内容</p>
      </OriginModal>
    );
  }
}
