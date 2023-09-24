const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const respond = (request, response, content, type, status) => {
  // Write head with correct status code
  response.writeHead(status, { 'Content-Type': type });

  // Write body and end
  response.write(content);
  response.end();
};

const objToXML = (object) => {
  // Start xml response
  let xml = '<response>';

  // Set message
  xml += `<message>${object.message}</message>`;

  // Check for id
  if (object.id) xml += `<id>${object.id}</id>`;

  // End xml response
  xml += '</response>';
  return xml;
};

const success = (request, response, acceptedTypes) => {
  const resObj = {
    message: 'This is a successful response',
  };

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 200);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 200);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const resObj = {
    message: 'This request has the required parameters',
  };

  // Check for missing params
  if (!params.valid || params.valid !== 'true') {
    resObj.message = 'Missing valid query parameter set to true';
    resObj.id = 'badRequest';

    // Check if xml is wanted
    if (acceptedTypes[0] === 'text/xml') {
      // Send xml response
      return respond(request, response, objToXML(resObj), 'text/xml', 400);
    }

    // Send json response
    return respond(request, response, JSON.stringify(resObj), 'application/json', 400);
  }

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 200);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 200);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const resObj = {
    message: 'You have successfully viewed the content',
  };

  // Check for missing params
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    resObj.message = 'Missing loggedIn query parameter set to yes';
    resObj.id = 'unauthorized';

    // Check if xml is wanted
    if (acceptedTypes[0] === 'text/xml') {
      // Send xml response
      return respond(request, response, objToXML(resObj), 'text/xml', 401);
    }

    // Send json response
    return respond(request, response, JSON.stringify(resObj), 'application/json', 401);
  }

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 200);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 200);
};

const forbidden = (request, response, acceptedTypes) => {
  const resObj = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 403);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 403);
};

const internal = (request, response, acceptedTypes) => {
  const resObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 500);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 500);
};

const notImplemented = (request, response, acceptedTypes) => {
  const resObj = {
    message: 'A get request for this page has not been implemented yet',
    id: 'notImplemented',
  };

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 501);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 501);
};

const notFound = (request, response, acceptedTypes) => {
  const resObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 404);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 404);
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
