const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': responseHandler.getIndex,
    '/style.css': responseHandler.getCSS,
    '/success': responseHandler.success,
    notFound: responseHandler.notFound,
}

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');
    const params = query.parse(parsedUrl.query);

    console.log(parsedUrl.pathname);

    // Check if path exists
    if(urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
    }
    else {
        // Send back 404 if path doesn't exist
        urlStruct.notFound(request, response, acceptedTypes);
    }
}

http.createServer(onRequest).listen(port, () => console.log(`listenting on 127.0.0.1:${port}`));