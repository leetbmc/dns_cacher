/*
 * Given a valid URI, extract the hostname
 */
function getHostFromURI(uri) {
  var parser = document.createElement("a");
  parser.href = uri;
  return parser.hostname;
}

/*
 * Validate an IPv4 formatted address
 */
function isValidIpV4Address(ipaddress)
{
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true)
  }
  return (false)
}

/*
 * Add a host/ip pair to the table. This function will initialize the table if
 * it is empty.
 *
 * The table format is:
  {
    'hostname': {
      222.222.222.222: true,
      111.111.111.111: true
    },
    'hostname2': {
      99.99.99.99: true
    }
  }
 */
function addIp(host, ip) {
  chrome.storage.local.get(
    {host_ips: {}},
    function (result) {
      var host_ips = result.host_ips;
      // alert("host_ips: " + JSON.stringify(host_ips, null, 2));
      if (host_ips[host] === undefined) {
        host_ips[host] = {};
      }
      host_ips[host][ip] = true;
      chrome.storage.local.set({"host_ips": host_ips}, function () {
        console.log("Logged host " + host + " at IP " + ip);
      });
    }
  );
}

/*
 * On a successfully completed request, log the IP of the host which responded
 * to the request. Ignores IPv6 addresses.
 */
chrome.webRequest.onCompleted.addListener(
  function(info) {
    var ip = info.ip;
    if (isValidIpV4Address(ip)) {
      var hostname = getHostFromURI(info.url);
      addIp(hostname, ip);
    }
    return;
  },
  {
    urls: [],
    types: []
  },
  []
);
