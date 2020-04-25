import { tracer } from '../dd-trace-js/packages/dd-trace'

tracer.init({
	env: 'development',
	hostname: '104.243.40.109',
	analytics: true,
	port: 8216,
	debug: true,
	dogstatsd: {
		port: 8125
	}
});

tracer.use('grpc', false);

export default tracer;
