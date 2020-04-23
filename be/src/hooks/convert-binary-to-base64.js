// convert binary file data to base64 for blob storage
const dauria = require('dauria');

module.exports = () => context => {
  if (!context.data.uri && context.params.file){
    const file = context.params.file;
    const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
    context.data = {uri: uri};
  }
};

