import React, {Component} from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import '../static/css/countModal.css';

class CountModal extends Component {
	static propTypes = {
		content: PropTypes.arrayOf(PropTypes.object),
		style: PropTypes.object,
		gradientLine: PropTypes.bool,
	}

	render() {
		const { style, content, gradientLine } = this.props;
		const border = {
			borderRight: '1px solid #ddd'
		}
		return (
			<div style={style} className='countModal'>
				<Row>
					{ content.map((item, index) => (
						<Col span="8" key={index} style={ gradientLine || index === 2 ? null : border }>
							<p style={style}>{ item.iconName ? <i className={`${item.iconName} iconfont titleIcon`}></i> : null }<span>{item.title}</span></p>
							<h4 style={{ fontSize: `calc(${style.fontSize} * 2)`, color: style.hColor }}>{item.total}
								{gradientLine && index !== 2 ? <i className='gradientLine'></i> : null }</h4>
							<p>{item.yesterday}
								{
									gradientLine ? null :
										(isNaN(item.yesterdayNum) || item.yesterdayNum === '0.00' ? ' 持平' :
											(<span style={{ color: (item.yesterdayNum > 0 ? '#d20b0b' : '#4fa906') }}> { item.yesterdayNum > 0 ? '↑￥' : '↓￥'}{item.yesterdayNum}</span>)) }
							</p>
						</Col>
					)) }
				</Row>
			</div>
		)
	}
}
CountModal.defaultProps = {
	gradientLine: false,
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
		hColor: '#fff',
		textAlign: 'center',
		fontSize: '12px',
	}
}
export default CountModal;
