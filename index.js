const os = require('os');
const mdnsBuilder = require('multicast-dns');
const express = require('express');

const ttl = 5 * 60 // 5 minutes

function start() {
    const mdns = mdnsBuilder();

    const entries = { };

    for (const key in process.env) {
      if (key.startsWith('MDNS_ENTRY_')) {
        const [hostname, ip] = process.env[key].split(':');
        entries[hostname.trim()] = ip.trim();
        console.log('added mdns entry', hostname, ip);
      }
    }

    if (!Object.keys(entries).length) {
      console.error('no MDNS entries found in env. Should start server with MDNS_ENTRY_SOMETHING=my-domain:192.168.1.1');
      process.exit(1);
    }

    mdns.on('query', (query) => {
        const answers = [];
        query.questions.forEach((q) => {
          if (q.type !== 'A') return;
          const ip = entries[q.name];
          if (!ip) return;
          answers.push({
            name: q.name,
            ttl,
            type: 'A',
            data: ip
          })
        })
        console.log('responding to mdns query with', response);
        mdns.respond({answers})
    })

    mdns.on('error', (err) => {
        console.log('error', err);
    });

    console.log('mdns server started')

    const app = express()
    app.get('/info', function (req, res) {
      res.send('i am alive')
    })
     
    app.listen(8080)
}

start();
