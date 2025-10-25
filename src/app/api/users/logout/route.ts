/** 
 * @method  GET
 * @route   ~/api/users/logout
 * @desc    Logout user 
 * @access  public
*/

import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies()
        cookieStore.delete("jwtToken")
        return Response.json({ message: "Logout successfully" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}