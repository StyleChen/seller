import React, {Component} from 'react';
// import axios from 'axios';
import TimeSelect from '../TimeSelect';

class Business extends Component {
	render() {
		return (
			<div>
				<div className='title'>营业统计</div>
				<TimeSelect url={'OrderCountList'} />
			</div>
		)
	}
}

export default Business;