//META{"name":"Encrypt"}*//

//donate.atipls.com

class Encrypt {
    constructor(){
        this.toggle = false; // For toggling if it should encrypt or decrypt text in message.
        this.key = "0123456789ABCDEF0123456789ABCDEF"; // No need to change this anymore, you can do it thru the settings. But this is the default key.
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

    decryptAll(){
        var self = this;
        $(".markup").each(function () {
            var i = $(this).html();
            if(i.startsWith('\u200B')){
                $(this).html(function (_, html) {
                    console.log(i);
                    var encrypted = i.replace('\u200B', "");
                    var decrypted = self.decrypt(encrypted);
                    if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 1){
                        return html.replace(i, '<span style="color: #e21f1f;">[ERROR] '+encrypted+'</span>');
                    } else if(decrypted.toString().toLowerCase().includes("error")) {
                        return html.replace(i, '<span style="color: #e21f1f;">'+decrypted+'</span>');
                    } else {
                        return html.replace(i, '<span style="color: #28e24e;">'+decrypted+'</span>');
                    }
                });
            }
        });
    }

    encryptInput(){
        
    }

    start(){
        var data = PluginUtilities.loadData("Encrypt", "key");
        this.key = data.key
        var libraryScript = document.createElement("script");
		libraryScript.setAttribute("type", "text/javascript");
		libraryScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js");
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
        
        setTimeout(function(){}, 10000);
        var self = this;
        this.decryptAll();
        $(window).bind('keydown', function(e){
            if(e.altKey && e.keyCode === 13){
                console.log("[EncryptCord] Alt Pressed Sir");
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
                        var decryp = self.decrypt($("textarea").html());
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
        this.decryptAll();
    }

    onSwitch(){
        this.decryptAll();
    }

    getName        () { return "Encrypt Plugin"; }
    getDescription () { return "Encrypt your messages on discord with a secret key, Hiding your messages from others and even Discord!"; }
    getVersion     () { return "0.0.1"; }
    getAuthor      () { return "Mcclures"; }
}
