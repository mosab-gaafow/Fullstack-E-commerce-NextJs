"use client";

import { categorySchema } from "@/validationSchema/categorySchema";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { API } from "@/lib/config";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";


// FOR UPDATING

// interface Props{
//     category : Category
// }

const CategoryForm = ({category}: {category?: Category}) => {

    // 1 form aa u adeegsaneena Update iyo insert



    // cash si manually u update garee
    const queryClient = useQueryClient();
    const router = useRouter();


  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name // haduu jiro waa update-ka
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    // setLoading(true);
    try{
        if(category) {
            await axios.patch(`${API}/admin/category/${category.id}`, values)

        }else{
            await axios.post(`${API}/admin/category`, values);
        }

        
// cash si manually u update garee
        queryClient.invalidateQueries({queryKey: ["category"]})
        // toast.success("Category Registered Successful✅");
        toast.success(category ? "Successfully Updated Category✅" : "Successfully registered Category✅")
        router.push('/dashboard/admin/category')
        // setLoading(false)
    }catch(e) {
        // setLoading(false)
        console.log("error in registering category",e)
        toast.error("Failed to register Category");
    }


  };

  return (

    <> 
    <Card className="max-w-xl mx-auto my-10">
      <CardHeader>
        <CardTitle>{category ? "Update Category" : "Register Category"}</CardTitle>

      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
            <SubmitButtonWithContent loading={form.formState.isSubmitting} isUpdate={!!category}/> 

          </form>
        </Form>
      </CardContent>
    </Card>
    <Toaster />
</>
  );
};

export default CategoryForm;


export const SubmitButtonWithContent = ({loading, isUpdate}: {loading: boolean, isUpdate: boolean})=> {
    // wxuu soo celinaa updating..,regis..., update iyo register
    if(loading) {
      // hadu true yahy wxa la raba in laso bandhigo imaa updating.. ama registering.. oo lasocdo icon-ka loading0ka
      return (
        <Button variant={'gafow'} className="space-x-2">
          {isUpdate ? "Updating" : "Registering"}  Category
         <Loader2 className="animate-spin h-5 w-5 text-white"/>
        </Button>
      )
    }
  
    // hadusan loading ahyn
    return <Button variant={'gafow'} type="submit">
          {isUpdate ? "Update Category" : "Register Category"}
    </Button>
  
  }
  
