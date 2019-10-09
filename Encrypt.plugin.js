//META{"name":"CryptCord"}*//
class CryptCord {
    constructor(){
        this.toggle = false;
        this.key = "0123456789ABCDEF0123456789ABCDEF";
        var libraryScript;

        /* JQuery Library           */ libraryScript = document.createElement("script"); libraryScript.setAttribute("type", "text/javascript"); libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js"); document.head.appendChild(libraryScript);
        /* BetterDiscord Library    */ libraryScript = document.getElementById('ZLibraryScript'); if (!window.ZLibrary && !libraryScript) { libraryScript = document.createElement('script'); libraryScript.setAttribute('type', 'text/javascript'); libraryScript.addEventListener("error", function () { if (typeof window.ZLibrary === "undefined") { window.BdApi.alert("Library Missing", `The library plugin needed for ${this.getName()} is missing and could not be loaded.<br /><br /><a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`); } }.bind(this)); libraryScript.setAttribute('src', 'https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js'); libraryScript.setAttribute('id', 'ZLibraryScript'); document.head.appendChild(libraryScript);}
        /* CryptoJS sha256 Library  */ libraryScript = document.createElement("script"); libraryScript.setAttribute("type", "text/javascript"); libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/sha256.js"); document.head.appendChild(libraryScript);
        /* CryptoJS base64 Library  */ libraryScript = document.createElement("script"); libraryScript.setAttribute("type", "text/javascript"); libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64.js"); document.head.appendChild(libraryScript);
        /* CryptoJS AES Library     */ libraryScript = document.createElement("script"); libraryScript.setAttribute("type", "text/javascript"); libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"); document.head.appendChild(libraryScript);

        this.unStartbtnHTML = `<div id="encryption_button"> <style>.tooltiptext{visibility:hidden;width:120px;background-color:#000;color:#fff;text-align:center;border-radius:5px;padding:5px 0;position:absolute;top:-66px;z-index:1}#encryption_button:hover .tooltiptext{visibility:visible}.tooltiptext::after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;bottom:-5px;content:"";position:absolute;right:45.9%}</style> <button aria-label="You are NOT Encrypted!" tabindex="2" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow" style="padding-top:5px;"> <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-2vd_v_ da-button"> <img src="/assets/4f1e1fa42efdf4de983e3f609d56eb4c.svg" aria-label="You are NOT Encrypted!" alt="You are NOT Encrypted!" draggable="false" style="filter: hue-rotate(320deg); width: 25px; height: 25px"> <span class="tooltiptext">You are sending <span style="color: #f06262;">unencrypted</span> messages.</span> </div></button> </div>`;
        this.enStartbtnHTML = `<div id="encryption_button"> <style>.tooltiptext{visibility:hidden;width:120px;background-color:#000;color:#fff;text-align:center;border-radius:5px;padding:5px 0;position:absolute;top:-66px;z-index:1}#encryption_button:hover .tooltiptext{visibility:visible}.tooltiptext::after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;bottom:-5px;content:"";position:absolute;right:45.9%}</style> <button aria-label="You are Encrypted!" tabindex="2" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow" style="padding-top:5px;"> <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-2vd_v_ da-button"> <img src="/assets/86c36b8437a0bc80cf310733f54257c2.svg" aria-label="You are Encrypted!" alt="You are Encrypted!" draggable="false" style="filter: hue-rotate(90deg); width: 25px; height: 25px"> <span class="tooltiptext">You are sending <span style="color: #74eb6c;">encrypted</span> messages.</span> </div></button> </div>`;
        this.unbtnHTML      = `<style>.tooltiptext{visibility:hidden;width:120px;background-color:#000;color:#fff;text-align:center;border-radius:5px;padding:5px 0;position:absolute;top:-66px;z-index:1}#encryption_button:hover .tooltiptext{visibility:visible}.tooltiptext::after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;bottom:-5px;content:"";position:absolute;right:45.9%}</style> <button aria-label="You are NOT Encrypted!" tabindex="2" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow" style="padding-top:5px;"> <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-2vd_v_ da-button"> <img src="/assets/4f1e1fa42efdf4de983e3f609d56eb4c.svg" aria-label="You are NOT Encrypted!" alt="You are NOT Encrypted!" draggable="false" style="filter: hue-rotate(320deg); width: 25px; height: 25px"> <span class="tooltiptext">You are sending <span style="color: #f06262;">unencrypted</span> messages.</span> </div></button>`;
        this.enbtnHTML      = `<style>.tooltiptext{visibility:hidden;width:120px;background-color:#000;color:#fff;text-align:center;border-radius:5px;padding:5px 0;position:absolute;top:-66px;z-index:1}#encryption_button:hover .tooltiptext{visibility:visible}.tooltiptext::after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #000;bottom:-5px;content:"";position:absolute;right:45.9%}</style> <button aria-label="You are Encrypted!" tabindex="2" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow" style="padding-top:5px;"> <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-2vd_v_ da-button"> <img src="/assets/86c36b8437a0bc80cf310733f54257c2.svg" aria-label="You are Encrypted!" alt="You are Encrypted!" draggable="false" style="filter: hue-rotate(90deg); width: 25px; height: 25px"> <span class="tooltiptext">You are sending <span style="color: #74eb6c;">encrypted</span> messages.</span> </div></button>`;
        
        this.encryptedStatus = false;
        this.buttonHTML = this.unStartbtnHTML;

        jQuery.expr[':'].regex = function (elem, index, match) {
            var matchParams = match[3].split(','),
                validLabels = /^(data|css):/,
                attr = {
                    method: matchParams[0].match(validLabels) ?
                        matchParams[0].split(':')[0] : 'attr',
                    property: matchParams.shift().replace(validLabels, '')
                },
                regexFlags = 'ig',
                regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
            return regex.test(jQuery(elem)[attr.method](attr.property));
        }
    }

    getName        () { return "CryptCord"; }
    getDescription () { return "Encrypt your messages on discord with a secret key, Hiding your messages from others and even Discord!"; }
    getVersion     () { return "0.1.0"; }
    getAuthor      () { return "Mcclures"; }
    
    createButton(){
        $('<div class="buttons-205you" style="padding-right: 0px !important;">'+this.buttonHTML+'</div>').insertBefore(".da-buttons");
    }

    changeButton(){
        $("#encryption_button").html(this.buttonHTML);
    }

    encrypt(text){
        try {
		    var encd = CryptoJS.AES.encrypt(text, this.key);
		    console.log("Salt: "+encd.salt.toString());
		    console.log("IV..: "+encd.iv.toString());
		    return encd;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    decrypt(text){
        try {
            return CryptoJS.AES.decrypt(text, this.key).toString(CryptoJS.enc.Utf8);
        } catch(err) {
            return err;
        }
    }

    formatMsg(msg){
		if(!msg){
            return "Error";
        } else {
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
    }

    decryptAll(){
        var data = ZLibrary.PluginUtilities.loadData("Encrypt", "key");
        if(!data.key){
            data.key = this.key;
        }
        this.key = data.key;
        var self = this;
        $(".da-markup").each(function(){
            var i = $(this).html();
            if(i.startsWith('\u200B')){
                $(this).html(function (_, html) {
                    console.log(i);
                    var encrypted = i.replace('\u200B', "");
                    var decrypted = self.decrypt(encrypted);
                    if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
                        return html.replace(i, '<span style="color: #e21f1f;">'+encrypted+'</span>');
                    } else if(decrypted.toString().toLowerCase().includes("error")) {
                        return html.replace(i, '<span style="color: #e21f1f;">'+decrypted+'</span>');
                    } else {
                        return html.replace(i, '<span style="color: #28e24e;">'+self.formatMsg(decrypted)+'</span>');
                    }
                });
            }
        });
    }

    randomKey(){
        let result = "";
        var possible = "0123456789ABCDEF0123456789ABCDEF";
        for (var i = 0; i < possible.length; i++) {
            result += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        $("#cryptkey").val(result);
    }

    saveSettings(){
        this.key = $("#cryptkey").val();
        ZLibrary.PluginUtilities.saveData("Encrypt", "key", {key: this.key});
    }

    getSettingsPanel(){
        var data = ZLibrary.PluginUtilities.loadData("Encrypt", "key");
        if(!data.key) { data.key = this.key; }
        return `<div style="color: white; padding: 20px;"> Key: <input id="cryptkey" style="padding: 10px; width:70%;outline:none;color: white;border: none; border-radius: 5px; background-color: hsla(218,5%,47%,.3);" value=${data.key}><br><br> <button onclick="BdApi.getPlugin('${this.getName()}').saveSettings()" style="background: #7289da;color: #FFF;border-radius: 5px;">Save Settings</button>&nbsp;<button onclick="BdApi.getPlugin('${this.getName()}').randomKey()" style="background: #7289da;color: #FFF;border-radius: 5px;">Generate Key</button></div>`;
    }
    
    start(){
        setTimeout(function(){console.log("[CRYPTCORD][DEBUG] Initalized")}, 10000);
        var self = this;
        $(window).bind('keydown', function(e){
            if(e.keyCode === 13 && self.encryptedStatus === true){
                console.log("[CRYPTCORD][DEBUG] Enter Key Pressed");
                var textarea = $("textarea");
                $("textarea").focus();
                $("textarea").select();
                var encryp = self.encrypt(textarea.html());
                document.execCommand("insertText", false, "\u200B"+encryp);
                this.toggle = false;
            }
        });

        this.createButton();

        $("#encryption_button").on("click", function() {
            console.log("[CRYPTCORD][DEBUG] Encryption Button Clicked")
            if(self.encryptedStatus){
                self.encryptedStatus = false;
                self.buttonHTML = self.unbtnHTML;
                self.changeButton();
            } else {
                self.encryptedStatus = true;
                self.buttonHTML = self.enbtnHTML;
                self.changeButton();
            }
        });
    }

    stop(){
        $(window).unbind('keydown');
        $("#encryption_button").remove();
    }

    observer(mutation) {
        this.decryptAll();
    }

    onSwitch(){
        $("#encryption_button").remove();
        if($("#encryption_button").length){

        } else {
            if(this.encryptedStatus){
                this.buttonHTML = this.enStartbtnHTML;
            } else {
                this.buttonHTML = this.unStartbtnHTML;
            }
            this.createButton();
        }
        var self = this;
        $("#encryption_button").on("click", function() {
            console.log("[CRYPTCORD][DEBUG] Encryption Button Clicked")
            if(self.encryptedStatus){
                self.encryptedStatus = false;
                self.buttonHTML = self.unbtnHTML;
                self.changeButton();
            } else {
                self.encryptedStatus = true;
                self.buttonHTML = self.enbtnHTML;
                self.changeButton();
            }
        });
        this.decryptAll();
    }
}
!"; }
    getVersion     () { return "0.1.0"; }
    getAuthor      () { return "Mcclures"; }
    
    createButton(){
        $('<div class="buttons-205you" style="padding-right: 0px !important;">'+this.buttonHTML+'</div>').insertBefore(".da-buttons");
    }

    changeButton(){
        $("#encryption_button").html(this.buttonHTML);
    }

    encrypt(text){
        try {
		    var encd = CryptoJS.AES.encrypt(text, this.key);
		    console.log("Salt: "+encd.salt.toString());
		    console.log("IV..: "+encd.iv.toString());
		    return encd;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    decrypt(text){
        try {
            return CryptoJS.AES.decrypt(text, this.key).toString(CryptoJS.enc.Utf8);
        } catch(err) {
            return err;
        }
    }

    formatMsg(msg){
		if(!msg){
            return "Error";
        } else {
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
    }

    decryptAll(){
        var data = ZLibrary.PluginUtilities.loadData("Encrypt", "key");
        if(!data.key){
            data.key = this.key;
        }
        this.key = data.key;
        var self = this;
        $(".da-markup").each(function(){
            var i = $(this).html();
            if(i.startsWith('\u200B')){
                $(this).html(function (_, html) {
                    console.log(i);
                    var encrypted = i.replace('\u200B', "");
                    var decrypted = self.decrypt(encrypted);
                    if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
                        return html.replace(i, '<span style="color: #e21f1f;">'+encrypted+'</span>');
                    } else if(decrypted.toString().toLowerCase().includes("error")) {
                        return html.replace(i, '<span style="color: #e21f1f;">'+decrypted+'</span>');
                    } else {
                        return html.replace(i, '<span style="color: #28e24e;">'+self.formatMsg(decrypted)+'</span>');
                    }
                });
            }
        });
    }

    randomKey(){
        let result = "";
        var possible = "0123456789ABCDEF0123456789ABCDEF";
        for (var i = 0; i < possible.length; i++) {
            result += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        $("#cryptkey").val(result);
    }

    saveSettings(){
        this.key = $("#cryptkey").val();
        ZLibrary.PluginUtilities.saveData("Encrypt", "key", {key: this.key});
    }

    getSettingsPanel(){
        var data = ZLibrary.PluginUtilities.loadData("Encrypt", "key");
        if(!data.key) { data.key = this.key; }
        return `<div style="color: white; padding: 20px;"> Key: <input id="cryptkey" style="padding: 10px; width:70%;
