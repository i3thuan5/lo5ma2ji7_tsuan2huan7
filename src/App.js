import React from 'react';
import axios from 'axios';
import { MainSection, Layout } from 'demo-ui';
import { 音標服務 } from './後端網址';
import Su1Jip8 from './元件/查詢';
import Kiat4Ko2 from './元件/顯示結果';
import Iah8Kha1 from './元件/頁腳';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      句子: null,
      正在查詢: false,
      查詢結果: null,
      非成功狀況: null,
    };
    this.查 = this.查.bind(this);
  }

  查(句子) {
    this.setState({
      正在查詢: true,
      非成功狀況: null,
    });

    axios.get(音標服務, {
      params: {
        //查詢腔口: "閩南語",
        查詢語句: 句子,
      }
    })
    .then(function (response) {
      if(response.data.hasOwnProperty('臺羅')
        && response.data.hasOwnProperty('白話字')){
        // success
        this.setState({
          查詢結果: response.data,
          正在查詢: false
        });
      }else{
        // API version error
        this.setState({
          非成功狀況: '回傳資料不存在臺羅和白話字',
          正在查詢: false
        });
      }
    }.bind(this))
    .catch(function (error) {
      // ajax error
      this.setState({
        非成功狀況: 'ajax error',
        正在查詢: false,
      });
    }.bind(this));
  }

  render() {
    let {句子, 正在查詢, 查詢結果} = this.state;
    return (
      <Layout>
        <MainSection>
          <Su1Jip8 
            預設句子={句子}
            正在查詢={正在查詢}
            handleClick={this.查}
            />
          {
            this.state.非成功狀況 ?
            this.state.非成功狀況
            : null
          }
          <Kiat4Ko2 查詢結果={查詢結果}/>
        </MainSection>

        <Iah8Kha1/>
      </Layout>
    );
  }
}

export default App;
