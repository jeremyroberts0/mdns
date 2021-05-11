# MDNS

A basic MDNS server to create mdns entries for other resources on your local network.

Create record with env var `MDNS_ENTRY_*`:

```
MDNS_ENTRY_bob=bobL192.168.100.1 MDNS_ENTRY_2=myrouter:192.168.1.1 npm start
```

The app will fail to start of no records are provided