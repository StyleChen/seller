import React, { Component } from 'react';
import axios from 'axios';
import { Input, Icon, Tabs, Button, Row, Col, message } from 'antd';
import './login.css';
import apis from '../utils/apis';
const TabPane = Tabs.TabPane;
let timer = null;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      phone: '',
      code: '',
      disabledBool: false,
      time: 0,
	    activeKey: '1',
    };
    this.emitEmptyUser = this.emitEmptyUser.bind(this);
    this.emitEmptyPassword = this.emitEmptyPassword.bind(this);
    this.emitEmptyPhone = this.emitEmptyPhone.bind(this);
    this.emitEmptyCode = this.emitEmptyCode.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.getCode = this.getCode.bind(this);
    this.login = this.login.bind(this);
    this.loginSMS = this.loginSMS.bind(this);
    this.loginDHW = this.loginDHW.bind(this);
    this.tabChange = this.tabChange.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }
  emitEmptyUser() {
    this.userName.focus();
    this.setState({
        userName: '',
    });
  }
  emitEmptyCode() {
    this.code.focus();
    this.setState({
        code: '',
    });
  }
  emitEmptyPassword() {
    this.password.focus();
    this.setState({
        password: '',
    });
  }
  emitEmptyPhone() {
    this.phone.focus();
    this.setState({
        phone: '',
    });
  }
  changeUser(e) {
    this.setState({
        userName: e.target.value,
    });
  }
    changePhone(e) {
      this.setState({
          phone: e.target.value,
      });
    }
    changeCode(e) {
      this.setState({
          code: e.target.value,
      });
    }
  changePassword(e) {
    this.setState({
        password: e.target.value,
    });
  }
  getCode(e) {
    e.preventDefault();
    if(!(/^1[3456789]\d{9}$/.test(parseInt(this.state.phone)))) {
      return message.warning('请输入正确的手机号码');
    }
    this.setState({ disabledBool: true });
    let timeNum = 60;
    timer = setInterval(() => {
      timeNum--;
      this.setState({
          time: timeNum,
      });
      if(timeNum === 0 ) {
          clearInterval(timer);
          this.setState({ disabledBool: false });
      }
    },1000);
    axios.post(apis.PhoneSMS, { phone: this.state.phone })
      .then((res) => {
        message.success(res.result);
      }).catch((res) => {
        message.success(res.msg);
    });
  }
	loginSMS() {
    axios.post(apis.LoginSMS, { name: this.state.phone, verify: this.state.code })
      .then((res) => {
        if (res.data.success) {
	        this.props.history.push('/Operate');
        }
      }).catch((res) => {
        console.log(res);
    })
  }
	loginDHW() {
		axios.post(apis.LoginDHW, { name: this.state.userName, pwd: this.state.password })
			.then((res) => {
				if (res.data.success) {
					this.props.history.push('/Operate');
				}
			}).catch((res) => {
			console.log(res);
		})
  }
	login() {
    this.state.activeKey === '1' ? this.loginSMS() : this.loginDHW();
  }
	tabChange(val) {
    this.setState({ activeKey: val });
  }
  componentWillUnmount() {
    clearInterval(timer);
  }
  render() {
      const { userName, password, phone, code, disabledBool, time, activeKey } = this.state;
      const prefixUser = <Icon type="user" />;
      const prefixPassword = <Icon type="lock" />;
      const prefixCode = <Icon type="mail" />;
      const suffixUser = userName ? <Icon type='close-circle' onClick={this.emitEmptyUser} /> : null;
      const suffixPhone = phone ? <Icon type='close-circle' onClick={this.emitEmptyPhone} /> : null;
      const suffixPassword = password ? <Icon type='close-circle' onClick={this.emitEmptyPassword} /> : null;
      const suffixCode = code ? <Icon type='close-circle' onClick={this.emitEmptyCode} /> : null;
      return (
          <div className='loginContainer'>
              <div className='login'>
                  <Tabs type='card' activeKey={activeKey} onChange={this.tabChange}>
                      <TabPane tab='手机验证登录' key='1'>
                          <div className='inputContainer'>
                              <Input className='loginInput' type='number' placeholder='请输入手机号' prefix={prefixUser} suffix={suffixPhone} value={phone} onChange={this.changePhone} ref={node => this.phone = node} />
                              <Row style={{ borderBottom: '1px solid #ddd' }}>
                                  <Col span={14}>
                                      <Input className='loginInput code' type='number' placeholder='请输入验证码' prefix={prefixCode} suffix={suffixCode} value={code} onChange={this.changeCode} ref={node => this.code = node} />
                                  </Col>
                                  <Col span={10}>
                                      <button className='getCode' disabled={ disabledBool } onClick={this.getCode}>获取验证码 { time ? `${time}s` : null }</button>
                                  </Col>
                              </Row>
                          </div>
                      </TabPane>
                      <TabPane tab='账号密码登录' key='2'>
                          <div className='inputContainer'>
                              <Input className='loginInput' placeholder='请输入用户名' prefix={prefixUser} suffix={suffixUser} value={userName} onChange={this.changeUser} ref={node => this.userName = node} />
                              <Input className='loginInput' type='password' placeholder='请输入密码' prefix={prefixPassword} suffix={suffixPassword} value={password} onChange={this.changePassword} ref={node => this.password = node} />
                          </div>
                      </TabPane>
                  </Tabs>
                  <Button type='primary' onClick={this.login} disabled={
                    (() => {
                      if (activeKey === '1') {
                        return (phone && code ? false : true);
                      } else {
                        return (userName && password ? false : true);
                      }
                    })()
                  }>登录</Button>
              </div>
          </div>
      );
  }
}

export default Login;