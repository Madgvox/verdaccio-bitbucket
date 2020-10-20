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

  this.logger.warn( `GET ${apiUrl}/user/permissions/workspaces` );
  this.logger.warn( username, password );

  return axios({
    method: 'get',
    url: `${apiUrl}/user/permissions/workspaces`,
    auth: { username, password }
  }).then( response => {
    const results = [];
    this.logger.warn( response );

    for( let i = 0; i < response.size; i++ ) {
      var val = response.values[ i ];
      results.push({
        workspace: val.workspace.slug,
        permission: val.permission
      });
    }

    return results;
  });
}

module.exports = Bitbucket;
