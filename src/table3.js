
function realTimeFeed(callback) {
	var tick = {};
	tick.plot0 = parseInt(10 + 90 * Math.random(), 10);
	tick.plot1 = parseInt(10 + 90 * Math.random(), 10);
	callback(JSON.stringify(tick));
  };
   

  function clearGraph() {
	zingchart.exec('myChart', 'clearfeed')
  }
   
  function startGraph() {
	zingchart.exec('myChart', 'startfeed');
  }
   
  function stopGraph() {
	zingchart.exec('myChart', 'stopfeed');
  }
   
  function randomizeInterval() {
	let interval = Math.floor(Math.random() * (1000 - 50)) + 50;
	zingchart.exec('myChart', 'setinterval', {
	  interval: interval,
	  update: false
	});
	output.textContent = 'Interval set to: ' + interval;
  }
 
  window.addEventListener('load', () => {
	
	document.getElementById('clear').addEventListener('click', clearGraph);
	document.getElementById('start').addEventListener('click', startGraph);
	document.getElementById('stop').addEventListener('click', stopGraph);
	document.getElementById('random').addEventListener('click', randomizeInterval);
   

	const myConfig = {
	  //chart styling
	  type: 'line',
	  globals: {
		fontFamily: 'Roboto',
	  },
	  backgroundColor: '#fff',
	  title: {
		backgroundColor: '#1565C0',
		text: 'Template Chart',
		color: '#fff',
		height: '30x',
	  },
	  plotarea: {
		marginTop: '80px'
	  },
	  crosshairX: {
		lineWidth: 4,
		lineStyle: 'dashed',
		lineColor: '#424242',
		marker: {
		  visible: true,
		  size: 9
		},
		plotLabel: {
		  backgroundColor: '#fff',
		  borderColor: '#e3e3e3',
		  borderRadius: 5,
		  padding: 15,
		  fontSize: 15,
		  shadow: true,
		  shadowAlpha: 0.2,
		  shadowBlur: 5,
		  shadowDistance: 4,
		},
		scaleLabel: {
		  backgroundColor: '#424242',
		  padding: 5
		}
	  },
	  scaleY: {
		guide: {
		  visible: false
		},
	  },
	  tooltip: {
		visible: false
	  },
	  //real-time feed
	  refresh: {
		type: 'feed',
		transport: 'http',
		url: 'https://us-central1-zingchart-com.cloudfunctions.net/public_http_feed?min=0&max=40&plots=1',
		interval: 200,
		maxTicks: 20,
		adjustScale: true,
		resetTimeout: 60,
	  },
	  plot: {
		shadow: 1,
		shadowColor: '#eee',
		shadowDistance: '10px',
		lineWidth: 5,
		hoverState: {
		  visible: false
		},
		marker: {
		  visible: false
		},
		aspect: 'spline'
	  },
	  series: [{
		values: [],
		lineColor: '#2196F3',
		text: 'Blue Line'
	  }, {
		values: [],
		lineColor: '#ff9800',
		text: 'Orange Line'
	  }]
	};
   
	// render chart with width and height to
	// fill the parent container CSS dimensions
	zingchart.render({
	  id: 'myChart',
	  data: myConfig,
	  height: '100%',
	  width: '100%',
	});
  });