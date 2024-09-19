
// export {default} from 'next-auth/middleware';

// export const config = {matcher: ['/dashboard/:path*'] } // wax walba oo hoos imaanaya dashboard-ka waa inu user-ka uu ahaada login.


import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
type User = {
    role: string
}
export const config = {
    matcher: [
        "/dashboard/user/:path*",
        // wax walbo user hoos imaado

         // "/api/user/:path*",

         "/dashboard/admin/:path*"
        // wax walbo admin-ka hoos imaado

          // "/api/admin/:path*",
    ]
}

export default withAuth(
    async function middleware(req){
        const url = req.nextUrl.pathname; // url-ka la taaganyhy so aqri
        // token-ka qadka ku jiro role-kisa no so qabo
        const userRole = (req?.nextauth?.token?.user as User).role // type assertion aa sameeyay interface gooni ahna waa u sameeyay

        if(url?.includes('/admin') && userRole != 'admin'){ // haddii mesha aan joogno ay thay admin uerRoloe-kana uu user yahay celi

            return NextResponse.redirect(new URL("/", req.url)) // page-ka cadiga geey meshana ka wad

        }

        return NextResponse.next();
    },

   {
    // qof-kan waa la authorize gareeyay oo token-kisa ba looso celinaa
    callbacks : {
        authorized: ({token}) => {
            return !!token; //means: hadu true yhay false ka dhige hadu false yhahy true ka dhige
        }
    }
   }
)

