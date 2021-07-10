var baseconfig = {};

if (process.env.NODE_ENV === 'development') {
	baseconfig = {
		server: 'http://spaapi.juhucn.com/',
	}
} else if (process.env.NODE_ENV === 'production') {
	baseconfig = {
		server: 'https://api.weiiz.com/',
		// server: 'http://spaapi.juhucn.com/',
	}
}

export default baseconfig;
