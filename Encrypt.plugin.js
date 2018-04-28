//META{"name":"Encrypt"}*//

//donate.atipls.com

class Encrypt {
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

    decryptAll(){
        var self = this;
        $(".markup").each(function () {
            var i = $(this).html();
            if(i.startsWith('\u200B')){
                $(this).html(function (_, html) {
                    console.log(i);
                    var encrypted = i.replace('\u200B', "");
                    var decrypted = self.decrypt(encrypted);
                    if(decrypted == "" || decrypted == " " || decrypted == null || !decrypted || decrypted.length < 4){
                        return html.replace(i, '<span style="color: #ffffff;">[ERROR] '+encrypted+'</span>');
                    } else if(decrypted.toString().toLowerCase().includes("error")) {
                        return html.replace(i, '<span style="color: #ffffff;">'+decrypted+'</span>');
                    } else {
                        return html.replace(i, '<span style="color: #ffffff;">'+decrypted+'</span>');
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
