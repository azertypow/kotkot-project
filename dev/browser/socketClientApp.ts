/**
 * Created by azertypow on 06/04/2017.
 */

/// <reference types="socket.io-client" />

export default class SocketClientApp {
    public static run() {
        let socket: SocketIOClient.Socket = io.connect('http://localhost:1337');

        document.querySelector("h1").addEventListener("click", (e)=>{
            console.log("clicked");
            e.preventDefault();

            socket.emit('click',{
               username: "nom"
            });

        });
    }
}