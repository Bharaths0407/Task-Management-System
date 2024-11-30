import { Models } from "node-appwrite";

export type Workspace = Models.Document & {
    name: string;
    imageUrl: string;
    invitecode: string;
    userId: string;
};