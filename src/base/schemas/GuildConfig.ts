import { Schema, model } from "mongoose";

interface IGuildConfig {
    guildId: string;
}

export default model<IGuildConfig>('IGuildConfig', new Schema<IGuildConfig>({
    guildId: String
}, {
    timestamps: true
}))