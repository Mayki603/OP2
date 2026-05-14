const EventEmitter = require("events");

class GameServer extends EventEmitter {
    notifyEvent(eventName, eventData) {
        this.emit(eventName, eventData);
    }
}

class ChatSystem {
    constructor(server) {
        this.server = server;

        this.joinListener = (player) => {
            console.log(`[Chat]: Welcome to the lobby, ${player.name}!`);
        };

        this.server.on("playerJoined", this.joinListener);
    }

    disconnect() {
        this.server.off("playerJoined", this.joinListener);
        console.log("[Chat]: System offline. Disconnected from events.");
    }
}

class MatchmakingSystem {
    constructor(server) {
        this.server = server;

        this.server.on("playerJoined", (player) => {
            console.log(`[Matchmaking]: Adding ${player.name} (Rank: ${player.rank}) to the queue...`);
        });
    }
}

const server = new GameServer();

const chat = new ChatSystem(server);
const matchmaking = new MatchmakingSystem(server);

server.on("playerJoined", (player) => {
    console.log(`[Analytics]: Logging connection for ID: ${player.id}`);
});

console.log("--- Player 1 connects ---");
server.notifyEvent("playerJoined", { id: 101, name: "ShadowNinja", rank: "Epic" });

console.log("\n--- Disconnecting Chat ---");
chat.disconnect();

console.log("\n--- Player 2 connects ---");
server.notifyEvent("playerJoined", { id: 102, name: "ProGamer99", rank: "Mythic" });