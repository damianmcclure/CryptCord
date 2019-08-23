//META{"name":"CryptCord"}*//

/*
CryptCord - BetterDiscord plugin for encrypting & decrypting messages with private key.
Thank you to AtiPLS for fixing things multiple times
*/

class CryptCord {
    constructor(){
        this.toggle = false;
        this.key = "0123456789ABCDEF0123456789ABCDEF";
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
	    
        var libraryScript = document.createElement("script");
	    libraryScript.setAttribute("type", "text/javascript");
	    libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js");
        document.head.appendChild(libraryScript);

        libraryScript = document.getElementById('ZLibraryScript');
        if (!window.ZLibrary && !libraryScript) {
            libraryScript = document.createElement('script');
            libraryScript.setAttribute('type', 'text/javascript');
            libraryScript.addEventListener("error", function () { if (typeof window.ZLibrary === "undefined") { window.BdApi.alert("Library Missing", `The library plugin needed for ${this.getName()} is missing and could not be loaded.<br /><br /><a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`); } }.bind(this));
            libraryScript.setAttribute('src', 'https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js');
            libraryScript.setAttribute('id', 'ZLibraryScript');
            document.head.appendChild(libraryScript);
        }
        
        libraryScript = document.createElement("script");
	    libraryScript.setAttribute("type", "text/javascript");
	    libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/sha256.js");
        document.head.appendChild(libraryScript);
        
        libraryScript = document.createElement("script");
	    libraryScript.setAttribute("type", "text/javascript");
	    libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64.js");
        document.head.appendChild(libraryScript);
        
        libraryScript = document.createElement("script");
	    libraryScript.setAttribute("type", "text/javascript");
	    libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js");
        document.head.appendChild(libraryScript);  
    }

    getName        () { return "CryptCord"; }
    getDescription () { return "Encrypt your messages on discord with a secret key, Hiding your messages from others and even Discord!"; }
    getVersion     () { return "0.0.8"; }
    getAuthor      () { return "Mcclures"; }

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
            msg="Nothing";
        }
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

    start(){
        setTimeout(function(){console.log("[CryptCord] Init Etc")}, 10000);

        var self = this;
        $(window).bind('keydown', function(e){
            if(e.altKey && e.keyCode === 13){
                console.log("[CryptCord] Alt Pressed Sir");
                var textarea = $("textarea");
                $("textarea").focus();
                $("textarea").select();
                if(!textarea.html() || textarea.html == ""){

                } else {
                    if(this.toggle){
                        var encryp = self.encrypt(textarea.html());
                        document.execCommand("insertText", false, "\u200B"+encryp);
                        this.toggle = false;
                    } else {
                        var decryp = self.decrypt($("textarea").html().replace("\u200B", ""));
                        document.execCommand("insertText", false, ""+decryp);
                        this.toggle = true;
                    }
                }
            }
            if(e.keyCode === 13 && !e.altKey){
                this.toggle = true;
                self.decryptAll();
            }
        });
        console.log(this.formatMsg("```cs urmom```"));
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
        return `<div style="color: white; padding: 20px;">
            Key: <input id="cryptkey" style="padding: 10px; width:70%;outline:none;color: white;border: none; border-radius: 5px; background-color: hsla(218,5%,47%,.3);" value=${data.key}><br><br>
            <button onclick="BdApi.getPlugin('${this.getName()}').saveSettings()" style="background: #7289da;color: #FFF;border-radius: 5px;">Save Settings</button><button onclick="BdApi.getPlugin('${this.getName()}').randomKey()" style="background: #7289da;color: #FFF;border-radius: 5px;">Generate Key</button>
        </div>`;
    }

    stop(){
        $(window).unbind('keydown');
    }

    load(){
        
    }

    unload(){

    }

    observer(mutation) {
        this.decryptAll();
    }

    onSwitch(){
        var self = this;
        var name_selector = "div:regex(class, .*name-.*)"; 
        var topic_selector = "div:regex(class, .*topic-.*)"; 
        var members_selector = "div:regex(class, .*membersGroup-.*)"; 
        var embed_selector = "div:regex(class, .*embedFieldName-.*)"; 
        if ($(name_selector).html()){
			if($(name_selector).html().startsWith("&#8203;") || $(name_selector).html().startsWith("U2") || $(name_selector).html().startsWith("\u200B")){
				console.log("[CryptCord] Server Name Formatted");
				var encrypted = $(name_selector).html().replace("\u200B", "").replace("&#8203;", "");
				var decrypted = this.decrypt(encrypted);
                if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
                    $(name_selector).html('<span style="color: #e21f1f;">'+encrypted+'</span>');
				} else if(decrypted.toString().toLowerCase().includes("error")) {
					$(name_selector).html('<span style="color: #e21f1f;">'+encrypted+'</span>');
				} else { 
					$(name_selector).html('<span style="color: #28e24e;">'+this.formatMsg(decrypted)+'</span>');
				}
			}
        }
        if($(topic_selector).html()){
			if($(topic_selector).html().startsWith("&#8203;") || $(topic_selector).html().startsWith("U2") || $(topic_selector).html().startsWith("\u200B")){
				console.log("[CryptCord] Topics Formatted");
				var encrypted = $(topic_selector).html().replace("\u200B", "").replace("&#8203;", "");
				var decrypted = this.decrypt(encrypted);
				if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
					$(topic_selector).html('<span style="color: #e21f1f;">'+encrypted+'</span>');
				} else if(decrypted.toString().toLowerCase().includes("error")) {
					$(topic_selector).html('<span style="color: #e21f1f;">'+encrypted+'</span>');
				} else {
					$(topic_selector).html('<span style="color: #28e24e;">'+this.formatMsg(decrypted)+'</span>');
				}
			}
        }
        $(members_selector).each(function(){
			if($(this).html().startsWith("&#8203;") || $(this).html().startsWith("U2") || $(this).html().startsWith("\u200B")){
				console.log("[CryptCord] One Role Formatted "+$(this).html());
				var ii = $(this);
				var ie = ii.html().split("—");
				var i = ie[0];
				var encrypted = i.replace("\u200B", "").replace("&#8203;", "");
				var decrypted = self.decrypt(encrypted);
				if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
					ii.html('<span style="color: #e21f1f;">'+encrypted+'</span>');
				} else if(decrypted.toString().toLowerCase().includes("error")) {
					ii.html('<span style="color: #e21f1f;">'+encrypted+'</span>');
				} else {
					ii.html('<span style="color: #28e24e;">'+decrypted+'</span>'+"—"+ie[1]);
				}
			}
        });
        $(embed_selector).each(function(){
			if($(this).html().startsWith("&#8203;") || $(this).html().startsWith("U2") || $(this).html().startsWith("\u200B")){
				console.log("[CryptCord] Embed Titles Formatted "+$(this).html());
				var ii = $(this);
				var ie = ii.html();
				var i = ie;
				var encrypted = i.replace("\u200B", "").replace("&#8203;", "");
				var decrypted = self.decrypt(encrypted);
				if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
					ii.html('<span style="color: #e21f1f;font-weight: bold;">'+encrypted+'</span>');
				} else if(decrypted.toString().toLowerCase().includes("error")) {
					ii.html('<span style="color: #e21f1f;font-weight: bold;">'+encrypted+'</span>');
				} else {
					ii.html('<span style="color: #28e24e;font-weight: bold;">'+decrypted+'</span>');
				}
			}
        });
        this.decryptAll();
    }
}
