const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
// const fetch = require('node-fetch')

module.exports = {
    name: "ipinfo",
    description: "Récupère les informations relative à une IP.",
    aliases: [],
    permissions: [],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async execute(client, message, args) {
        const noip = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription("`❌` Veuillez me donner une IP valide")

        if (!args[0] || !ipRegex.test(args[0])) return message.channel.send({embeds: [noip]})

        const res = await fetch(`http://ip-api.com/json/${ip}`);
        const json = await res.json();

        if (json.status !== "success") return message.channel.send({embeds: [embed]})

        const embed = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription(`
            > \`📍\` ${json.country} (${json.countryCode})
            > \`📍\` ${json.regionName} (${json.region})
            > \`📍\` ${json.city}
            
            > \`⏲️\` ${json.timezone}
            
            > \`🌐\` ${json.zip}
            > \`🌐\` ${json.lat}
            > \`🌐\` ${json.long}
            
            > \`🛜\` ${json.org}
            > \`🛜\` ${json.isp}
            > \`🛜\` ${json.as}`.replaceAll('            ', ''))

        message.channel.send({embeds: [embed]})
    },
    async executeSlash(client, interaction) {
        const ip = interaction.options.getString("ip")

        const noip = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription("`❌` Veuillez me donner une IP valide")

        if (!ip || !ipRegex.test(ip)) return interaction.reply({embeds: [noip], ephemeral: true})

        const res = await fetch(`http://ip-api.com/json/${ip}`);
        const json = await res.json();

        if (json.status !== "success") return interaction.reply({embeds: [embed], ephemeral: true})

        const embed = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setDescription(`
            > \`📍\` \`Pays\`   ${json.country} (${json.countryCode})
            > \`📍\` \`Région\` ${json.regionName} (${json.region})
            > \`📍\` \`Ville\`  ${json.city}
            
            > \`⏲️\` \`Timezone\` ${json.timezone}
            
            > \`🌐\` \`Zip\` ${json.zip}
            > \`🌐\` \`Lat\` ${json.lat}
            > \`🌐\` \`Lon\` ${json.lon}
            
            > \`🛜\` \`Org\` ${json.org}
            > \`🛜\` \`ISP\` ${json.isp}
            > \`🛜\` \`AS\`  ${json.as}`.replaceAll('            ', ''))

        interaction.reply({embeds: [embed], ephemeral: true})
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption(o => o.setName("ip").setDescription("l'IP à rechercher").setRequired(true))
    }
}