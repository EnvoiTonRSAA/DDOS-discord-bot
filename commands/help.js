const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Affiche les commandes du bot.",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle("Commandes DDoS")
            .setColor(0x2B2D31)
            .setDescription("*Les paramètres entre **`<...>`** sont obligatoire, alors que les paramètres entre **`[...]`** eux sont facultatifs*")
            .addFields({name: `\`${client.config.prefix}ddos <ip>\``, value: "Lance une attaque DDoS sur une certaine IP"})
            .addFields({name: `\`${client.config.prefix}ddos [stop]\``, value: "Arrête complètement votre attaque DDoS (prend jusqu'à 3m)"})
            .addFields({name: `\`${client.config.prefix}ipinfo <ip>\``, value: "Affiche les informations concernant une IP"})
            .addFields({name: `\`${client.config.prefix}iplogger <lien>\``, value: "Crée un lien rapide et cache le lien d'IP Grabber"})
            .addFields({name: `\`${client.config.prefix}help\``, value: "Affiche la liste des commandes du bot (ce menu)"})
            .addFields({name: `\`${client.config.prefix}ping\``, value: "Affiche la latance du bot"})

        message.channel.send({embeds: [embed]})
    },
    async executeSlash(client, interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Commandes DDoS")
            .setColor(0x2B2D31)
            .setDescription("*Les paramètres entre **`<...>`** sont obligatoire, alors que les paramètres entre **`[...]`** eux sont facultatifs*")
            .addFields({name: `\`/ddos start\``, value: "Lance une attaque DDoS sur une certaine IP"})
            .addFields({name: `\`/ddos stop\``, value: "Arrête complètement votre attaque DDoS (prend jusqu'à 3m)"})
            .addFields({name: `\`/ipinfo\``, value: "Affiche les informations concernant une IP"})
            .addFields({name: `\`/iplogger\``, value: "Crée un lien rapide et cache le lien d'IP Grabber"})
            .addFields({name: `\`/help\``, value: "Affiche la liste des commandes du bot (ce menu)"})
            .addFields({name: `\`/ping\``, value: "Affiche la latance du bot"})

        interaction.reply({embeds: [embed]})
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}