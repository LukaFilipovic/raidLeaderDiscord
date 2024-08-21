export default interface IConfig {
    token: string;
    discordClientId: string,
    guildId: string;
    mongoUrl: string;

    devToken: string;
    devDiscordClientId: string;
    devGuildId: string;
    developerUserIds: string[];

    devMongoUrl: string;

}