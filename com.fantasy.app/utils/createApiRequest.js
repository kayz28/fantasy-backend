
const createRequestPayload = (method, url, headers) => {
   const options = {
        'method': method,
        'url': url,
        'headers': headers
   }
   return options;

};

module.exports = createRequestPayload;