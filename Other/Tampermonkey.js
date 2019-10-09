// WARNING: THIS ISNT WORKING! PLEASE CONSIDER FIXING IT :)
// ========================================================

// ==UserScript==
// @name         CryptCord
// @namespace    https://github.com/mcclureski/cryptcord
// @version      0.0.8
// @description  Discord plugin for encrypting & decrypting messages with private key.
// @author       Mcclures
// @match        https://discordapp.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/sha256.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

//META{"name":"CryptCord"}*//
//.markup is .da-markup now
//Credits to: AtiPLS for ideas and etc

var toggle = false;
var key;
if (GM_getValue("key") === "") {
    key = "0123456789ABCDEF0123456789ABCDEF";
} else {
    key = GM_getValue("key");
}

function encrypt(text) {
    try {
        var encd = CryptoJS.AES.encrypt(text, key);
        console.log("Salt: " + encd.salt.toString());
        console.log("IV..: " + encd.iv.toString());
        return encd;
    } catch (err) {
        return err;
    }
}

function decrypt(text) {
    try {
        return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } catch (err) {
        return err;
    }
}

function formatMsg(msg) {
    if (!msg) { msg = "no msg etc" }
    var bold = /\*\*([^*]+)\*\*/g;
    var italic = /\*([^*]+)\*/g;
    var underline = /\_([^*]+)\_/g;
    var strike = /\~\~([^*]+)\~\~/g;

    var url = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    var inline = /\`([^*]+)\`/g;

    var codeblocksingle = /\`\`\`([^*]+)\`\`\`/g;
    var codeblockmulti = /\`\`\`(\w+)\n((?:(?!\`\`\`)[\s\S])*)\`\`\`/g;

    msg = msg.replace(bold, "<b>$1</b>");
    msg = msg.replace(italic, "<i>$1</i>");
    msg = msg.replace(underline, "<U>$1</U>");
    msg = msg.replace(strike, "<s>$1</s>");
    msg = msg.replace(codeblockmulti, `<pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs $1" style="position: relative;">$2</code></pre>`);
    msg = msg.replace(codeblocksingle, `<pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs" style="position: relative;">$1</code></pre>`);
    msg = msg.replace(inline, `<code class="inline">$1</code>`);
    msg = msg.replace(url, "<a href='$1'>$1</a>");

    return msg;
}

function decryptAll() {
    var data = GM_getValue("key")
    key = data;
    $(".da-markup").each(function () {
        var i = $(this).html();
        if (i.startsWith('\u200B')) {
            $(this).html(function (_, html) {
                console.log(i);
                var encrypted = i.replace('\u200B', "");
                var decrypted = decrypt(encrypted);
                if (decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1) {
                    return html.replace(i, '<span style="color: #e21f1f;">' + encrypted + '</span>');
                } else if (decrypted.toString().toLowerCase().includes("error")) {
                    return html.replace(i, '<span style="color: #e21f1f;">' + decrypted + '</span>');
                } else {
                    return html.replace(i, '<span style="color: #28e24e;">' + self.formatMsg(decrypted) + '</span>');
                }
            });
        }
    });
}

(function () {
    console.log(encrypt("ee"));
    $(window).bind('keydown', function (e) {
        if (e.altKey && e.keyCode === 13) {
            e.preventDefault();
            console.log("[CryptCord] Starting...");
            var textarea = $("textarea");
            var value = textarea.innerHTML;
            $("textarea").focus();
            $("textarea").select();
            console.log(textarea);
            console.log(value)
            if (!value || value == "") {
                console.log("[CryptCord] Nothing To Encrypt!");

            } else {
                if (toggle) {
                    var encryp = encrypt(value);
                    document.execCommand("insertText", false, "\u200B" + encryp);
                    console.log("[CryptCord] Encrypted Text In Textarea");
                    toggle = false;
                } else {
                    var decryp = decrypt(value.replace("\u200B", ""));
                    document.execCommand("insertText", false, "" + decryp);
                    console.log("[CryptCord] Decrypted Text In Textarea");
                    toggle = true;
                }
            }
        }
        if (e.keyCode === 13 && !e.altKey) {
            toggle = true;
            decryptAll();
        }
    });
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;
            if (newNodes !== null) {
                var $nodes = $(newNodes);
                $nodes.each(function () {
                    decryptAll();
                    console.log("ETC AND SO ON");
                });
            }
        });
    });

    observer.observe($("body")[0], {
        childList: true
    });
})();
