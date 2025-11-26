import { ACCESS_TOKEN } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAuthToken(name: string = ACCESS_TOKEN) {
  const cookieStore = await cookies();  
  //@ts-ignore
  const token = await cookieStore.get(name)?.value; // get the value or undefined
    if (!token) {
    // Redirect to sign-in if no token found
    redirect("/sign-in");
  }
  return token ?? null;
}