const apis = {
    'PhoneSMS': '/ERPAPP/Login/PhoneSMS',
    'LoginSMS': '/ERPAPP/Login/SMS',
    'LoginDHW': '/ERPAPP/Login/DHW',
    'OrderCount': '/ERPAPP/Order/OrderCount',
    'OrderCountList': '/ERPAPP/Order/OrderCountList',
};
const GetDateStr = function(AddDayCount) {
	    const dd = new Date();
	    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    const y = dd.getFullYear();
	    const m = dd.getMonth()+1;//获取当前月份的日期
	    const d = dd.getDate();
	    return y+"-"+m+"-"+d;
	};

export { apis as default, GetDateStr }