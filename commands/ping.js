const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Afficher le ping du bot.",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        message.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms.`).catch(() => false);
    },
    async executeSlash(client, interaction) {
        interaction.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms.`).catch(() => false);
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}