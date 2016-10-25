## Synopsis

DNS Cacher is a chrome plugin that attempts to create some amount of robustness in the browser against DNS outages.

## Motivation

The sort or large-scale DNS outages caused by the DDOS attacks against Dyn in October of 2016 are enormously disruptive. If the local browser cached recent lookups of IP addresses commonly trafficked by the user, there might be some immunity possible to this sort of outage.

## Status

On first checkin, only the maintenance of the data is complete. The plugin uses the **chrome.storage.local** API to persist a table of hostnames and their corresponding IP addresses.

At this time, it serves only to consume memory. ;-)

The next step will be to catch DNS lookup errors from the **chrome.webRequest** entry point and attempt to substitute a locally-cached IP address for the hostname in the request, and attempt the request again.

## Installation

Currently the only way to install the plugin is to check it out of github and install it using Chrome's developer mode.

## Contributors

Brendan Coffey <bmc@section9.net>

## License

This project is GPL v3.0 licensed. Copyright 2016 Brendan Coffey.
