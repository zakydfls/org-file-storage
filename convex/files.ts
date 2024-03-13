import {mutation, query} from "./_generated/server";
import {v} from "convex/values";


export const createFile = mutation({
    args:{
        name: v.string()
    },
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("You must be logged in to upload a file.")
        }

        await ctx.db.insert("files", {
            name: args.name
        })
    }
})

export const getFile = query({
    args:{
    },
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            return []
        }

        return await ctx.db.query("files").collect()
    }
})
