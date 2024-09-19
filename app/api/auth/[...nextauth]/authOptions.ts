import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client"; 


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers : [
        // google, github iyo kuwa kle waa ku isticmali kartaa
        GoogleProvider ({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        
    ],
     // waxan rabnaa inaan helno Role-ka oon ku darno
    // waxn rabnaa inaan helno role-ka
    callbacks: {
        jwt: async({token}) => {
            const userInfo = await prisma.user.findFirst({where: {email: token.email}});

            if(userInfo){
                userInfo.emailVerified = undefined !;
                // userInfo.hashedPassword = undefined !;
            }
            // userInfo oo dhameestiran oo role-ka ku jiro ayaa u dhiibeena
            token.user = userInfo;

            return token;
        },
        // session: qof-ka markuu login soo dhaho oo application-ka uu isticmaalayao
        session: async({session, token}) => {

            session.user = token.user!; // 
            return session

        }
    },

    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma) as any
} 



