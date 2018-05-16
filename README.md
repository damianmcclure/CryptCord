# CryptCord
BetterDiscord plugin for encrypting &amp; decrypting messages with private key.

## Instructions
1) Replace the key in Plugin Settings
2) Share this key with another person (preferrably thru another platform so discord doesn't see your messages)
3) Type a message
4) To toggle between Encryption and Decryption, press ALT+Enter.
5) If you want your roles/servername/descriptions to be encrypted, type the text in the message, encrypt it, and then copy paste it to the role/servername/description box. it will auto decrypt those too.

## About
There's multiple reasons you might wanna use this.
1) In Discord's TOS, it says they may collect and share your personal info you send in discord.
2) You might wanna have a private conversation (though pm's exist)
3) Other reasons which I'm not gonna get into...

## Screenshots
![example1](https://i.imgur.com/lx665z7.png)<br>
The red messages are messages you don't have the key for, the green ones are.
<br><br>
![example2](https://i.imgur.com/jynl1Xz.png)<br>
Example of how the settings look (you must press the button)
<br><br>
![example3](https://i.imgur.com/eLJgxxs.png)<br>
An entire server Encrypted, with a bot that responds to encrypted messages (coming soon)
<br><br>
![example4](https://i.imgur.com/yL8djOR.png)<br>
Supports Citador quotes.
<br><br>
![example5](https://i.imgur.com/O4faa2T.png)<br>
Semi-supports discord markup with encryption (no text highlighting or emojis)

## Plans
This isnt 100% done at all, I did this real quick in about an hour. I plan to:<br>
1) Make it possibly more secure
2) Make entire servers be encrypted (works kindof, but you have to manually change it)
3) Make support for emojis and codeblock markup highlighting
4) Done! ~~Make it so you can edit the keys without having to edit the file (via settings or maybe another box on discord)~~
5) Done! ~~Make it more fleshed out with less errors.~~

## Known Bugs
* Fixed! ~~If you just opened discord and you loaded into a channel with encrypted text, it will say CryptoJS is not defined~~<br>
* If you use "Citador" or another quote based program it tends to show "Malformed UTF-8 Text" for unknown reason.

## Change Log (5/15/18) v0.0.3
* Fixed some bugs
* Now possible to encrypt server names, roles, and topics for channels (you have to do it manually)
* Auto update, you shouldn't have to manually update it anymore.
* Supports Citador quotes, no longer shows "Malformed UTF-8 Text"
* Support for Markup, codeblocks, and code line blocks

## Change Log (4/28/18) v0.0.2
* Now you can edit the key VIA the betterdiscord settings
* Doesn't Encrypt blank message
* No more lock emoji as prefix, it detects it another way.
* Some Bugs Fixed.
