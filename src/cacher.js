function gotItem(item) {
  if (chrome.runtime.lastError) {
    alert(chrome.runtime.lastError);
  } else {
    alert(item);
  }
}

function getHostFromURI(uri) {
  var parser = document.createElement("a");
  parser.href = uri;
  return parser.hostname;
}

function isValidIpV4Address(ipaddress)
{
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true)
  }
  return (false)
}

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
