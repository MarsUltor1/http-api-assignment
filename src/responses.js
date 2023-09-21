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
  response.writeHead(status, {'Content-Type': type});

  // Write body and end
  response.write(content);
  response.end();
}

const objToXML = (object) => {
  // Start xml response
  let xml = '<response>'

  // Set message
  xml += `<message>${object.message}</message>`;

  // Check for id
  if (object.id) xml += `<id>${object.id}</id>`;

  // End xml response
  xml += '</response>'
  return xml
}

const success = (request, response, acceptedTypes) => {
  const resObj = {
    message: 'This is a successful response',
  }

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 200);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 200);
}

const notFound = (request, response, acceptedTypes) => {
  const resObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  }

  // Check if xml is wanted
  if (acceptedTypes[0] === 'text/xml') {
    // Send xml response
    return respond(request, response, objToXML(resObj), 'text/xml', 404);
  }

  // Send json response
  return respond(request, response, JSON.stringify(resObj), 'application/json', 404);
}

module.exports = {
  getIndex,
  getCSS,
  success,
  notFound,
};