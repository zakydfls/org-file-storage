"use client";
import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, SignOutButton, useSession} from "@clerk/nextjs";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";

export default function Home() {
    const session = useSession();
    const files = useQuery(api.files.getFile);
    const createFile = useMutation(api.files.createFile);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <SignedIn>
                <SignOutButton>
                    <Button>Sign In</Button>
                </SignOutButton>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button>Sign In</Button>
                </SignInButton>
            </SignedOut>

            {files?.map(file=>{
                return <div key={file._id}>{file.name}</div>
            })}

            <Button onClick={()=>{
                createFile({
                    name: "test"
                })
            }}>Click Me</Button>
        </main>
    );
}
