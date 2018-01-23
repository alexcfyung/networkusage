# networkusage
## Setup
In the server,
Run `npm install`
Run `npm start`

## API
1. `/interfacelist`
  Display a list of interfaces.
2. `/networkusage`
  View network usage.
  
  Parameters:
  * `iface`, interface name, can get from `interfacelist`
  * `X`, if provided this api will return the average network usage in last X minutes
  
  Result:
  * `iface`, interface name
  * `rx`, received bytes overall
  * `tx`, transferred bytes overall
  * `rx_in_X_min`, received bytes in last X minutes
  * `tx_in_X_min`, transferred bytes in last X minutes
  * `X`, in minutes