import React, {Component} from 'react';
import axios from 'axios';
import { Row, Col, Spin } from 'antd';
import CountModal from '../CountModal';
import './operate.css';
import apis from '../../utils/apis';
class Operate extends Component {
	constructor() {
		super();
		this.state = {
			spinBool: true,
			content: [
				{
					title: '今日营业额',
					total: '123.00',
					yesterday: '昨日',
					yesterdayNum: 233,
					iconName: 'icon-tongji',
				},
				{
					title: '今日订单',
					total: '123.00',
					yesterday: '昨日',
					yesterdayNum: 233,
					iconName: 'icon-dingdan',
				},
				{
					title: '客单价',
					total: '123.00',
					yesterday: '昨日',
					yesterdayNum: 233,
					iconName: 'icon-huiyuankedanjia',
				},
			],
			style: {
				background: '#eb5e1b',
				color: '#fff',
				textAlign: 'center',
				fontSize: '12px',
			}
		}
		this.componentWillMount = this.componentWillMount.bind(this);
		this.redirect = this.redirect.bind(this);
	}
	componentWillMount() {
		axios.post(apis.OrderCount).then((res) => {
			console.log(res.data);
			if (res.data.success) {
				const dataArrall = res.data.result;
				const dataArr = dataArrall[0];
				this.setState({
					spinBool: false,
					content: [
						{
							title: '今日营业额',
							total: parseFloat(dataArr.total_fee).toFixed(2),
							yesterday: `昨日${parseFloat(dataArr.yesterFee).toFixed(2)}`,
							iconName: 'icon-tongji',
						},
						{
							title: '今日订单',
							total: parseFloat(dataArr.number).toFixed(2),
							yesterday: `昨日${parseFloat(dataArr.yesterNumber).toFixed(2)}`,
							iconName: 'icon-dingdan',
						},
						{
							title: '客单价',
							total: parseFloat(dataArr.price).toFixed(2),
							yesterday: `昨日${parseFloat(dataArr.yesterPrice).toFixed(2)}`,
							iconName: 'icon-huiyuankedanjia',
						},
					]
				});
			}
		})
	}
	redirect(url) {
		this.props.history.push(`/${url}`);
	}
	render() {
		return (
			<div>
				<div className='title'>门店运营</div>
				<Spin spinning={this.state.spinBool} delay={500} tip={'Loading...'}><CountModal content={this.state.content} gradientLine={true}></CountModal></Spin>

				<div className='navTab' style={{ marginTop: '0.7rem' }}>
					<p><i className='leftTip'></i><span>门店管理</span></p>
					<Row>
						<Col span={6}>
							<dl>
								<dd>
									<i className='iconfont icon-shangpinguanli'></i>
								</dd>
								<dt>商品管理</dt>
							</dl>
						</Col>
						<Col span={6}>
							<dl>
								<dd>
									<i className='iconfont icon-yonghupingjia'></i>
								</dd>
								<dt>用户评价</dt>
							</dl>
						</Col>
						<Col span={6}>
							<dl>
								<dd>
									<i className='iconfont icon-duizhang'></i>
								</dd>
								<dt>财务对账</dt>
							</dl>
						</Col>
						<Col span={6}>
							<dl>
								<dd>
									<i className='iconfont icon-diaoyong'></i>
								</dd>
								<dt>活动配置</dt>
							</dl>
						</Col>
					</Row>
				</div>
				<div className='navTab'>
					<p><i className='leftTip'></i><span>经营数据</span></p>
					<Row>
						<Col span={6}>
							<dl onClick={this.redirect.bind(this,'Business')}>
								<dd>
									<i className='iconfont icon-statistics'></i>
								</dd>
								<dt>营业统计</dt>
							</dl>
						</Col>
						<Col span={6}>
							<dl>
								<dd>
									<i className='iconfont icon-liuliang'></i>
								</dd>
								<dt>流量分析</dt>
							</dl>
						</Col>
						<Col span={6}>
							<dl>
								<dd>
									<i className='iconfont icon-fenxi'></i>
								</dd>
								<dt>商品分析</dt>
							</dl>
						</Col>
						<Col span={6}>
							<dl>
								<dd>
									<i className='iconfont icon-icon'></i>
								</dd>
								<dt>顾客分析</dt>
							</dl>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default Operate;