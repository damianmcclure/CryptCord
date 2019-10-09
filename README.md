# CryptCord
BetterDiscord plugin for encrypting &amp; decrypting messages with private key.

## About
A Discord plugin for encrypting your messages with AES-256, using the CryptoJS library. I don't know the full extent of the security of AES-256, but you should do your own research, <a href="https://crypto.stackexchange.com/questions/2251/how-secure-is-aes-256">StackExchange</a>. I am not responsible for miss-use of this plugin with any illegal activities or otherwise TOS-Breaking things on Discord. You are solely responsible for what you use this tool for.

## Instructions
1. Download and install the plugin via BetterDiscord or whatever plugin manager you choose.
2. Go to the plugin settings in BetterDiscord, or edit the Encrypt.plugin.js file and change the encryption key. On BetterDiscord you can click "Generate Key".
3. Save the settings or the file.
4. Give the key to said person, prefferably via another platform so Discord does not have the key in any way.
5. Go to where you wish to send an encrypted message, Type it out, and then hold ALT and press enter. It will send an encrypted message.

## Screenshots
![example1](https://i.imgur.com/mN1SpgC.png)<br>
The red messages are messages you don't have the key for, the green ones are.
<br><br>
![example2](https://i.imgur.com/qA22Y2S.gif)<br>
Example of how to turn on or off the encryption.
<br><br>
![example3](https://i.imgur.com/4GCFLSr.png)<br>
The BetterDiscord settings area.
<br><br>
![example4](https://i.imgur.com/tc6qHx1.png)<br>
Supports Citador quotes.
<br><br>
![example5](https://i.imgur.com/24wZ3Ke.png)<br>
Supports Discord Markup excluding code highlighting and Emojis.

## Known Bugs
* on macOS the alt key does not always work (this is because of the way macOS alt key works)
* for large amounts of text, using Citador quotes, or other unknown random reasons, it will sometimes say `Error: Malformed UTF-8 data`

## Future Plans
* Fixing general bugs.
* Fixing the Tampermonkey script.
