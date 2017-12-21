import React, { Component } from 'react';
import { Tabs, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import CountModal from './CountModal';
import axios from 'axios';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import '../static/css/timeSelect.css';
import apis, { GetDateStr } from '../utils/apis';
const { TabPane } = Tabs;

class TimeSelect extends Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
	}
	constructor() {
		super();
		this.state = {
			activeKey: '0',
			content_7: null,
			content_30: null,
			content_0: null,
			content: [
				{
					title: '营业额',
					total: '123.00',
					yesterday: '比昨日233.00',
				},
				{
					title: '订单量',
					total: '123.00',
					yesterday: '比昨日233.00',
				},
				{
					title: '客单价',
					total: '123.00',
					yesterday: '比昨日233.00',
				},
			],
			style: {
				background: '#FFF',
				color: '#666',
				hColor: '#333',
				textAlign: 'center',
				fontSize: '12px',
			},
			// 自定义时间
			startValue: null,
			endValue: null,
			endOpen: false,
		}
		this.tabChange = this.tabChange.bind(this);
	}
	getData(numb = '1', begindates = '', enddates = '') {
		axios.post(apis[this.props.url], { num: numb, begindate: begindates, enddate: enddates })
			.then((res) => {
				const data = res.data.result.list;
				if (numb === '1') {
					this.setState({
						content: [
							{
								title: '营业额',
								total: parseFloat(data.total_fee).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterFee).toFixed(2),
							},
							{
								title: '订单量',
								total: parseFloat(data.number).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterNumber).toFixed(2),
							},
							{
								title: '客单价',
								total: parseFloat(data.price).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterPrice).toFixed(2),
							},
						]
					});
				} else if (numb === '7') {
					this.setState({
						content_7: [
							{
								title: '营业额',
								total: parseFloat(data.total_fee).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterFee).toFixed(2),
							},
							{
								title: '订单量',
								total: parseFloat(data.number).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterNumber).toFixed(2),
							},
							{
								title: '客单价',
								total: parseFloat(data.price).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterPrice).toFixed(2),
							},
						]
					});
				} else if (numb === '30') {
					this.setState({
						content_30: [
							{
								title: '营业额',
								total: parseFloat(data.total_fee).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterFee).toFixed(2),
							},
							{
								title: '订单量',
								total: parseFloat(data.number).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterNumber).toFixed(2),
							},
							{
								title: '客单价',
								total: parseFloat(data.price).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterPrice).toFixed(2),
							},
						]
					});
				} else if(numb === '0') {
					this.setState({
						content_0: [
							{
								title: '营业额',
								total: parseFloat(data.total_fee).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterFee).toFixed(2),
							},
							{
								title: '订单量',
								total: parseFloat(data.number).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterNumber).toFixed(2),
							},
							{
								title: '客单价',
								total: parseFloat(data.price).toFixed(2),
								yesterday: data.st,
								yesterdayNum: parseFloat(data.yesterPrice).toFixed(2),
							},
						]
					});
				}
			});
	}
	componentWillMount() {
		this.getData();
	}
	componentDidMount() {
// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
			title: { text: 'ECharts 入门示例' },
			tooltip: {},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'line',
				data: [5, 20, 36, 10, 10, 20],
			}]
		});
	}
	tabChange(key) {
		this.setState({ activeKey: key });
		switch (key) {
			case '7':
				if (this.state.content_7 === null) {
					this.getData(key);
				}
				break;
			case '30':
				if (this.state.content_30 === null) {
					this.getData(key);
				}
				break;
			case '0':
				if (this.state.content_0 === null) {
					this.setState({ content_0: this.state.content });
				}
				break;
			default:
				return;
		}
	}

	// 自定义时间选择
	disabledStartDate = (startValue) => {
		const endValue = this.state.endValue;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	}

	disabledEndDate = (endValue) => {
		const startValue = this.state.startValue;
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	}

	onChange = (field, value) => {
		this.setState({
			[field]: value,
		});
	}

	onStartChange = (value) => {
		this.onChange('startValue', value);
	}

	onEndChange = (value) => {
		this.onChange('endValue', value);
		this.getData('0', moment(this.state.startValue).format('YYYY-MM-DD'), moment(value).format('YYYY-MM-DD'));
	}

	handleStartOpenChange = (open) => {
		if (!open) {
			this.setState({ endOpen: true });
		}
	}

	handleEndOpenChange = (open) => {
		this.setState({ endOpen: open });
	}
	render() {
		const { content, style, activeKey, content_7, content_30, content_0, startValue, endValue, endOpen } = this.state;
		const show = activeKey === '0' ? 'block' : 'none';
		return (
			<div>
				<div className='containerW'>
					<Tabs type='card' tabPosition='top' animate={true} activeKey={activeKey} onChange={this.tabChange}>
						<TabPane key={'1'} tab={'今天'}>
							<div className='calcTime'><span>统计时间 :</span><div className='customTime'> {GetDateStr(0)}</div></div>
							<div className='calcTime'><i className='leftTip'></i>营业统计</div>
							{ content ? <CountModal content={ content } style={style}></CountModal> : null }
						</TabPane>
						<TabPane key={'7'} tab={'近7天'}>
							<div className='calcTime'><span>统计时间 : </span><div className='customTime'>{GetDateStr(-7)} - {GetDateStr(0)}</div></div>
							<div className='calcTime'><i className='leftTip'></i>营业统计</div>
							{ content_7 ? <CountModal content={ content_7 } style={style}></CountModal> : null }
						</TabPane>
						<TabPane key={'30'} tab={'近30天'}>
							<div className='calcTime'><span>统计时间 : </span><div className='customTime'>{GetDateStr(-30)} - {GetDateStr(0)}</div></div>
							<div className='calcTime'><i className='leftTip'></i>营业统计</div>
							{ content_30 ? <CountModal content={ content_30 } style={style}></CountModal> : null }
						</TabPane>
						<TabPane key={'0'} tab={'自定义'} forceRender={true}>
							<div className='calcTime'><span>统计时间 : </span>
								<div className='customTime'>
									<Row type={ 'flex' } justify={ 'space-around' }>
										<Col span={10}>
											<DatePicker
												disabledDate={this.disabledStartDate}
												defaultValue={moment(GetDateStr(0))}
												format="YYYY-MM-DD"
												value={startValue}
												placeholder="Start"
												onChange={this.onStartChange}
												onOpenChange={this.handleStartOpenChange}
											/>
										</Col>
										<Col span={2}><p style={{ textAlign: 'center' }}>至</p></Col>
										<Col span={10}>
											<DatePicker
												disabledDate={this.disabledEndDate}
												defaultValue={moment(GetDateStr(0))}
												format="YYYY-MM-DD"
												value={endValue}
												placeholder="End"
												onChange={this.onEndChange}
												open={endOpen}
												onOpenChange={this.handleEndOpenChange}
											/>
										</Col>
									</Row>
								</div>
							</div>
							<div className='calcTime'><i className='leftTip'></i>营业统计</div>
							{ content_0 ? <CountModal content={ content_0 } style={style}></CountModal> : null }
							<div className='calcTime' style={{ marginTop: '10px' }}><i className='leftTip'></i>趋势对比</div>
							<div id="main" style={{ width: '100%', height: 300 }}></div>
						</TabPane>
					</Tabs>
				</div>
			</div>
		);
	}
}
export default TimeSelect