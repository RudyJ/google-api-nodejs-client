'use strict';

const {google} = require('googleapis');
const sampleClient = require('../sampleclient');

const youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client,
});

async function runSample() {
  const res = await getPlaylistData(null);
  const etag = res.data.etag;
  console.log(`etag: ${etag}`);
  const res2 = await getPlaylistData(etag);
  console.log(res2.status);
}

async function getPlaylistData(etag) {
  const headers = {};
  if (etag) {
    headers['If-None-Match'] = etag;
  }
  const res = await youtube.playlists.list({
    part: 'id,snippet',
    id: 'PLIivdWyY5sqIij_cgINUHZDMnGjVx3rxi',
    headers: headers,
  });
  console.log('Status code: ' + res.status);
  console.log(res.data);
  return res;
}

const scopes = ['https://www.googleapis.com/auth/youtube'];

sampleClient
  .authenticate(scopes)
  .then(runSample)
  .catch(console.error);
