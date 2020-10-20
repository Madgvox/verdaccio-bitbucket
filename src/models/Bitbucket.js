const axios = require('axios');

const API_URL = 'https://api.bitbucket.org';
const API_VERSION = '2.0';

function Bitbucket(username, password, logger) {
  this.apiUrl = `${API_URL}/${API_VERSION}`;
  this.username = username;
  this.password = password;
  this.logger = logger;
}

Bitbucket.prototype.getPrivileges = function getPrivileges () {
  const { username, password, apiUrl } = this;

  return axios({
    method: 'get',
    url: `${apiUrl}/user/permissions/workspaces`,
    auth: { username, password }
  }).then( response => {
    const results = [];
    
    for( let v of response.values ) {
      results.push({
        workspace: v.workspace.slug,
        permission: v.permission
      });
    }

    return results;
  });
}

module.exports = Bitbucket;
