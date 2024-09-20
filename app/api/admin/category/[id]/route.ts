import { categorySchema } from "@/validationSchema/categorySchema";
import { NextRequest, NextResponse } from "next/server"

export async function PATCH (request: NextRequest, {params}: {params: {id: string}}) {
    

    try{

        if(request.headers.get('content-length') == '0'){
            return NextResponse.json("You must provide something in the bidy..");
        }  

        const body = await request.json();

        const validation = categorySchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(validation.error.format(), {status: 400});
        }

        const categories = await prisma?.category.findUnique({where: {id: params.id}})
        
        if(!categories) {
            return NextResponse.json("Unknown Category", {status: 400})
        }

        const newCategory = await prisma?.category.update({where: {id: params.id}, data: {
            name : body.name
        }});

        return NextResponse.json(newCategory, {status: 201});

    }catch(e){
        console.log("Eror at updating", e)
        return NextResponse.json("not updated");
    }


}


export async function DELETE (request: NextRequest, {params}: {params: {id: string}}) {



    try{

        if(request.headers.get('content-length') == '0'){

            return NextResponse.json({error: "You have to provide body Information"}, {status: 400});
        }
        
        const categs = await prisma?.category.findUnique({where: {id: params.id}});
        if(!categs) {
            return NextResponse.json("No Category found with this Id..", {status: 400});
        }

        const delCat = await prisma?.category.delete({where: {id: params.id}});

        return NextResponse.json("Successfully Deleted✅", {status: 201});

    }catch(e) {
        console.log("eror", e);
        return NextResponse.json("eroro", {status: 400})
    }

}

