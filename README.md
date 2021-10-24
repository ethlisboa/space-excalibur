# SpaceXcalibur

[![GitHub](https://img.shields.io/github/license/ethlisboa/space-excalibur)](LICENSE)
![GitHub top language](https://img.shields.io/github/languages/top/ethlisboa/space-excalibur)
![Lines of code](https://img.shields.io/tokei/lines/github/ethlisboa/space-excalibur)
![Amazing!](https://img.shields.io/badge/this%20repository%20is-amazing-ff69b4)
[![Discord](https://img.shields.io/discord/894647872543400047?label=discord)](https://discord.gg/WQT8BKXk9N)

**SpaceXcalibur** - The quest for the last energy saber. The legend has it, that space-king Arthur once pulled it out of the asteroid. But where is it now? ;)
* 🔪 Game: [space-excalibur](https://github.com/ethlisboa/space-excalibur)
* 🗒️ Contracts: [space-contracts](https://github.com/ethlisboa/space-contracts)
* 🥗 Recipes: [space-recipes](https://github.com/ethlisboa/space-recipes)

SpaceXcalibur [v0.0.5](https://github.com/ethlisboa/space-excalibur/releases/tag/v0.0.5) is deployed on IPFS; hash:
- [ipfs://QmTZ2RfrZuKicHEmjCeg8DG4WswREBFdmcDVpcJgjCXEqS](ipfs://QmTZ2RfrZuKicHEmjCeg8DG4WswREBFdmcDVpcJgjCXEqS)
- https://bafybeicnox2zw6iwpekohasd5q57emwpdd32h6g7uynnbgoa5b476ycrvu.ipfs.dweb.link
- https://bafybeicnox2zw6iwpekohasd5q57emwpdd32h6g7uynnbgoa5b476ycrvu.ipfs.cf-ipfs.com

Devpost: https://devpost.com/software/spacexcalibur

Installation
============

  * Make sure you have Node.js ≥ 14 installed (https://nodejs.org)
  * Install dependencies: `yarn install`

Running the game
================

* `yarn run dev`: Run the game locally

Deployment
==========

### Deploying on Github Pages

The game can be easily deployed via the <a href="../../settings/pages">Github Pages Settings Page</a>, using the root folder.

### Deploying on IPFS

To deploy on IPFS we need to do the following steps:

* Retrieve API keys from [Pinata](https://pinata.cloud/)
  * `PINATA_API_KEY`
  * `PINATA_API_SECRET_KEY`
* Input these keys as <a href="../../settings/secrets/actions">Repository Secrets</a>
* Go to the <a href="../../actions/workflows/release.yaml">Release Workflow</a> on Github Actions and click `Run Workflow`.
* The game is now deployed and can be accessed using the IPFS gateways listed on the <a href="../../releases">Release Notes</a>

Contributing
============

SpaceXcalibur was ideated and implemented at [ETHLisbon](https://ethlisbon.org) (2021). All code is free and open-source, licensed under the terms and conditions of Apache 2.0.
