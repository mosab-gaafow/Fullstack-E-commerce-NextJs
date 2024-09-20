import { categorySchema } from "../../../../validationSchema/categorySchema";

import prisma from '../../../../prisma/client'
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    if(request.headers.get('content-length') == '0') {
        return NextResponse.json({error: "You have to provide body infomation"});
    }

   const body = await request.json();

   const validation = categorySchema.safeParse(body);

   if(!validation.success) {
    return NextResponse.json(validation.error.format());
   }

   const newCategory = await prisma.category.create({
    data: {
        name: body.name
    }
   });

   return NextResponse.json(newCategory, {status: 201});

}

export async function GET (request: NextRequest) {

    const categories = await prisma.category.findMany({
        orderBy: {
            created: "desc"
        }
    });

    if(!categories) {
        return NextResponse.json("No Categories Found..");
    }

    return NextResponse.json(categories);

}

