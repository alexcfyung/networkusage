# networkusage
## Setup
Run `npm start` in the server.

## API
1. `/interfacelist`
  Display a list of interfaces.
2. `/networkusage`
  View network usage.
  Parameters:
  * `iface`, an interface name, can get from `interfacelist`
  * `X`, if provided this api will return the average network usage in last X minutes