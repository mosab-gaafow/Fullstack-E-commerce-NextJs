import React from 'react'
import CategoryForm from '../_components/CategoryForm'
import { notFound } from 'next/navigation';

const UpdateCategoryPage = async({params}: {params: {id: string}}) => {
  
  
    let category;
    
    try{
      category = await prisma?.category.findUnique({where: {id: params.id}});

      if(!category) notFound();

    }catch(e){
      console.log("eror", e);
      notFound();
    }

    // console.log(category)

  
  return (
   <CategoryForm category={category}/>
  )
}

export default UpdateCategoryPage
