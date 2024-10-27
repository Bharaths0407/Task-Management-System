import "server-only";
// custom middleware built for use of appwrite 
import {
    Account,
    Client,
    Databases,
    Models,
    Storage,
    type Account as AccountType,
    type Databases as DatabasesType,
    type Storage as StorageType,
    type Users as UsersType,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/constants";

type AdditionalContext = { // type safety for variables or else you will get error in the server route page when you fetch the details from it.
    Variables: {
        account: AccountType;
        databases: DatabasesType;
        storage: StorageType;
        users: UsersType;
        user: Models.User<Models.Preferences>
    }
}

export const sessionMiddleware = createMiddleware<AdditionalContext>(
    async (c, next) => {
        const client = new Client()
           .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
           .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
        
        const session = getCookie(c, AUTH_COOKIE); // we are going to read the cookie

        if(!session) {// if session cookie is not available
            return c.json({error: "Unauthorized" }, 401);
        }

        client.setSession(session);//if we have we are going to pass it to the client instance

        const account = new Account(client);
        const databases = new Databases(client);
        const storage = new Storage(client);

        const user  = await account.get();

        c.set("account", account);
        c.set("databases", databases);
        c.set("storage", storage);
        c.set("user", user);

        await next(); // to end the middleware
    },
);