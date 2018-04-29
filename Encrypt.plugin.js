//META{"name":"CryptCord"}*//

//donate.atipls.com

class CryptCord {
    constructor(){
        this.toggle = false;
        // CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS
        // CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS
        // CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS
        this.key = "0123456789ABCDEF0123456789ABCDEF"; 
        // CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS
        // CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS
        // CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS CHANGE THIS
    }

    encrypt(text){
        try {
            return CryptoJS.AES.encrypt(text, this.key);
        } catch(err) {
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
        var bold = /\*\*([^*]+)\*\*/g;
        var italic = /\*([^*]+)\*/g;
        var underline = /\_([^*]+)\_/g;
        var strike = /\~\~([^*]+)\~\~/g;

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
        
        return msg;
    }

    decryptAll(){
        var data = PluginUtilities.loadData("Encrypt", "key");
        this.key = data.key;
        var self = this;
        $(".markup").each(function(){
            var i = $(this).html();
            if(i.startsWith('\u200B')){
                $(this).html(function (_, html) {
                    console.log(i);
                    var encrypted = i.replace('\u200B', "");
                    var decrypted = self.decrypt(encrypted);
                    if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
                        return html.replace(i, '<span style="color: #e21f1f;">[ERROR] '+self.formatMsg(encrypted)+'</span>');
                    } else if(decrypted.toString().toLowerCase().includes("error")) {
                        return html.replace(i, '<span style="color: #e21f1f;">'+self.formatMsg(decrypted)+'</span>');
                    } else {
                        return html.replace(i, '<span style="color: #28e24e;">'+self.formatMsg(decrypted)+'</span>');
                    }
                });
            }
        });
    }

    encryptInput(){
        
    }

    start(){
        var libraryScript = document.createElement("script");
		libraryScript.setAttribute("type", "text/javascript");
		libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js");
        document.head.appendChild(libraryScript);

        libraryScript = document.createElement("script");
		libraryScript.setAttribute("type", "text/javascript");
		libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js");
		document.head.appendChild(libraryScript);
        
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

    saveSettings(){
        this.key = $("#zugg").val();
        PluginUtilities.saveData("Encrypt", "key", {key: this.key});
    }

    getSettingsPanel(){
        var data = PluginUtilities.loadData("Encrypt", "key");
        if(!data.key) { data.key = this.key; }
        return `<div style="color: white; padding: 20px;">
            Key: <input id="zugg" style="padding: 10px; width:70%;outline:none;color: white;border: none; border-radius: 5px; background-color: hsla(218,5%,47%,.3);" value=${data.key}><br><br>
            <button onclick="BdApi.getPlugin('${this.getName()}').saveSettings()" style="background: #7289da;color: #FFF;border-radius: 5px;">Save Settings</button>
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
        if(!PluginUtilities){

        } else {
            this.decryptAll();
        }
    }

    onSwitch(){
        this.decryptAll();
    }

    getName        () { return "CryptCord"; }
    getDescription () { return "Encrypt your messages on discord with a secret key, Hiding your messages from others and even Discord!"; }
    getVersion     () { return "0.0.2"; }
    getAuthor      () { return "Mcclures"; }
}
