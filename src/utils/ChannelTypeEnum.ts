enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15,
    GUILD_MEDIA = 16
}

export function getChannelTypeDescription(type: number): string {
    switch (type) {
        case ChannelType.GUILD_TEXT:
            return "Text Channel";
        case ChannelType.DM:
            return "Direct Message";
        case ChannelType.GUILD_VOICE:
            return "Voice Channel";
        case ChannelType.GROUP_DM:
            return "Group DM";
        case ChannelType.GUILD_CATEGORY:
            return "Category";
        case ChannelType.GUILD_ANNOUNCEMENT:
            return "Announcement Channel";
        case ChannelType.ANNOUNCEMENT_THREAD:
            return "Announcement Thread";
        case ChannelType.PUBLIC_THREAD:
            return "Public Thread";
        case ChannelType.PRIVATE_THREAD:
            return "Private Thread";
        case ChannelType.GUILD_STAGE_VOICE:
            return "Stage Voice Channel";
        case ChannelType.GUILD_DIRECTORY:
            return "Directory Channel";
        case ChannelType.GUILD_FORUM:
            return "Forum Channel";
        case ChannelType.GUILD_MEDIA:
            return "Media Channel";
        default:
            return "Unknown Type";
    }
}