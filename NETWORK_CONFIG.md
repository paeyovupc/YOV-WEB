# Network configuration

Since I had troubles setting the port to 443 what I've done is port forwarding.
Host the web on the default port (3000) and forward port 443 to 3000.

*Note: Not the nicest solution, since this way we are using two ports but it
was the easier one.*

## Commands

To enable the port forwarding:
```bash
# localhost/loopback
sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 443 -j REDIRECT --to-ports 3000

# external
sudo iptables -t nat -I PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 3000
```

To disable the port forwarding:
```bash
# localhost/loopback
sudo iptables -t nat -D OUTPUT -p tcp -d 127.0.0.1 --dport 443 -j REDIRECT --to-ports 3000

# external
sudo iptables -t nat -D PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 3000
```

## Disabling apache server
If you want to stop the apache server because you want to run the webpage on
port 80, run the following command:
```bash
sudo apache2ctl stop
```

To enable port forwarding on port 80:
```bash
# localhost/loopback
sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 3000

# external
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
```

To start the apache server again:
```bash
sudo apache2ctl start
```

## Resources
- [link](https://coderwall.com/p/plejka/forward-port-80-to-port-3000)

