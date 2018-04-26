//META{"name":"Encrypt"}*//
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
            if(i.startsWith(`<img src="/assets/86c36b8437a0bc80cf310733f54257c2.svg" class="emoji" alt=":lock:" draggable="false"> `)){
                $(this).html(function (_, html) {
                    console.log(i);
                    var encrypted = i.replace(`<img src="/assets/86c36b8437a0bc80cf310733f54257c2.svg" class="emoji" alt=":lock:" draggable="false"> `, "");
                    return html.replace(i, '<span style="color: #28e24e;"><img src="/assets/4f1e1fa42efdf4de983e3f609d56eb4c.svg" class="emoji jumboable" alt=":unlock:" draggable="false"> '+self.decrypt(encrypted)+'</span>');
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
                if(this.toggle){
                    var encryp = self.encrypt(textarea.html());
                    document.execCommand("insertText", false, ":lock: "+encryp);
                    this.toggle = false;
                } else {
                    var decryp = self.decrypt($("textarea").html());
                    document.execCommand("insertText", false, ""+decryp);
                    this.toggle = true;
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
