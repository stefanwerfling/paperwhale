<p style="align-content: center">
<img src="doc/images/logo.png" alt="Logo" width="100%">
</p><br>

[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/stefanwerfling/paperwhale?style=for-the-badge)](https://lgtm.com/projects/g/stefanwerfling/paperwhale/)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/stefanwerfling/paperwhale?style=for-the-badge)](https://lgtm.com/projects/g/stefanwerfling/paperwhale/)

# Paper-Whale
Paper-Whale is a service for image processing. The service is integrated into other software as an API.

## Motivation
I've had it more often now, not only in my own projects, but have also been asked by other people that OCR text recognition is needed on a scan. As stated in the discussions, the wish is far from being fulfilled. As if by magic, the right place should be returned as text for a form.
I can understand this desire to scan a document and then get the appropriate invoice number and then carry out automatic accounting would be a great dream if this worked perfectly and without further ado.

Since, as I said, I have often been asked that the wish coincides with my wish, but that the functionality will be lived out differently in detail, I have come to the decision to approach the development differently.
It should no longer be a development into a closed product, but a service that can be integrated into any product.

I would like to be inspired here by the "WOPI". A file (image/PDF) will be made available to the service. Then the user gets a frontend UI in the browser in which he sees the image using a known template or fields can be used to limit areas on the image. They are then processed by OCR and returned to the API calling. The latter can then continue to use the values.

In addition, a process flow is ordered ready, my own wish is to receive scans directly from the network and then hand over the product to him, example with WSD Scan.

## Workflows

There are currently 2 processes that the service provides:

### API Binding
1) customer software send to Paper-Whale
2) Image/PDF convert
3) user interface template select and fields
4) OCR processing
5) customer software

### Scan by Hardware
1) Scan Hardware send to Paper-Whale
2) Image/PDF convert
3) Template autoselect
4) OCR processing
5) send to customer software

## Service

To ensure high compatibility, the service is built in Docker. A whale for a whale.

## Information sources
* WS-DD: http://docs.oasis-open.org/ws-dd/discovery/1.1/wsdd-discovery-1.1-spec.pdf

## Re-Engineering
* Wireshark, use for tracking wsdd packets. It is important to see the structure in the http and udp multicast.

## Tested/to be implemented hardware
### Scanner over WSD protocol
* Ricoh Aficio MP C3001


# Thanks and sources
* Logo by [Kunai_PvP](https://favpng.com/png_user/Kunai_PvP) -> [Logo](https://favpng.com/png_view/whale-paper-whale-origami-balaenidae-png/UytUVH57) license: ```Personal Use```