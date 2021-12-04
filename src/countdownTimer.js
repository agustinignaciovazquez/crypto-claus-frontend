import React from 'react';
import moment from 'moment';
import "./styles/countdown-timer.css";

export default class CountdownTimer extends React.Component {
	state = {
		days: undefined,
		hours: undefined,
		minutes: undefined,
		seconds: undefined
	}
	
	componentDidMount() {
		this.interval = setInterval(() => {
			const { timeTillDate, timeFormat } = this.props;
			const then = moment(timeTillDate, timeFormat);
			const now = moment();
			const countdown = moment(then - now);
			const days = countdown.format('D');
			const hours = countdown.format('HH');
			const minutes = countdown.format('mm');
			const seconds = countdown.format('ss');

			this.setState({ days, hours, minutes, seconds });
		}, 1000);
	}

	componentWillUnmount() {
		if(this.interval) {
			clearInterval(this.interval);
		}
	}
	
	render() {
		const { days, hours, minutes, seconds } = this.state;
		const daysEndAngle = mapNumber(days, 30, 0, 0, 360);
		const hoursEndAngle = mapNumber(hours, 24, 0, 0, 360);
		const minutesEndAngle = mapNumber(minutes, 60, 0, 0, 360);
		const secondsEndAngle = mapNumber(seconds, 60, 0, 0, 360);
		
		let start = 175;
		let end = 175;
		let radius = 150;
		

		if(!seconds) {
			return null;
		}
		
		if(window.innerWidth >= 3840){
			start = 350;
			end = 350;
			radius = 300;
		}
		
		return (
			<div>
				<div className='countdown-wrapper'>
					{days && (
						<div className='countdown-item'>
							<SVGCircle start={start} end={end} radius={radius} endAngle={daysEndAngle} />
							{days} 
							<span>days</span>
						</div>
					)}
					{hours && (
						<div className='countdown-item'>							
							<SVGCircle start={start} end={end} radius={radius} endAngle={hoursEndAngle} />
							{hours} 
							<span>hours</span>
						</div>
					)}
					{minutes && (
						<div className='countdown-item'>
							<SVGCircle start={start} end={end} radius={radius} endAngle={minutesEndAngle} />
							{minutes} 
							<span>minutes</span>
						</div>
					)}
					{seconds && (
						<div className='countdown-item'>
							<SVGCircle start={start} end={end} radius={radius} endAngle={secondsEndAngle} />
							{seconds} 
							<span>seconds</span>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const SVGCircle = ({start, end, radius, endAngle }) => (
		<svg className='countdown-svg'>
			<path fill="none" stroke="#fffeed" strokeWidth="10" d={describeArc(start, end, radius, 0, endAngle)}/>
		</svg>
);

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}