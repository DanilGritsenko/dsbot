const config = require("./config.json");
const Discord = require("discord.js");
const chalk = require('chalk');
const gamedig = require("gamedig");

const client = new Discord.Client();

client.config = config;

var nb = 1000

const updateChannel = async () => {
	    const stats = await gamedig.query({
	        type: "garrysmod",
	        host: config.playerCountServerIP,
	        port: config.playerCountServerPort
		});
		
	    if (stats.raw.numplayers != nb) {
			client.user.setActivity({
            name: `${stats.raw.numplayers}/12`,  //The message shown
            type: "PLAYING"
			});
	    }
		
		
};

client.on("ready", () => {

	console.log(chalk.green("[BOT] Connected to Discord."));
	
	updateChannel();
	setInterval(updateChannel, 60000*0.05);
	
});

client.login(config.token);
