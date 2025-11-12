import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function getAuthToken(name: string = "access_token") {
  const cookieStore = cookies();  
  //@ts-ignore
  const token = cookieStore.get(name)?.value; // get the value or undefined
    if (!token) {
    // Redirect to sign-in if no token found
    redirect("/sign-in");
  }
  return token ?? null;
}