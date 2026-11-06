"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      {/* <h2>Chat Page: </h2> */}
      <Button className="cursor-pointer" onClick={() => router.push('/chat')}>Go to Chat Page</Button>
      {/* <Link href={"/chat"} className="text-underline">Chat Page</Link> */}
    </div >
  );
}
