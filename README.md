<h1 align="center">CryptCord</h1>

<h4>*This project is discontinued. BetterDiscord and Discord itself is changing things much too often for me to want to keep up with it.</h4>

## About
A Discord plugin for encrypting your messages with AES-256, using the CryptoJS library. I don't know the full extent of the security of AES-256, but you should do your own research, <a href="https://crypto.stackexchange.com/questions/2251/how-secure-is-aes-256">StackExchange</a>. I am not responsible for miss-use of this plugin with any illegal activities or otherwise TOS-Breaking things on Discord. You are solely responsible for what you use this tool for.

## Installation
1. Download and install the plugin via BetterDiscord or whatever plugin manager you choose.
2. Go to the plugin settings in BetterDiscord, or edit the Encrypt.plugin.js file and change the encryption key. On BetterDiscord you can click "Generate Key".
3. Save the settings or the file.
4. Give the key to said person, prefferably via another platform so Discord does not have the key in any way.
5. Now, if you want to enable encryption, there is two ways to do it. One, click the lock emoji in the text bar beside the other buttons, this will toggle the mode on or off. The other way is to press `ALT` and `Enter` at the same time, it will encrypt the message before sending it out.

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
