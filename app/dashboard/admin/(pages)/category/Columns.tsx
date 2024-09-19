"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { AlertDialogBox } from "./_components/AlertDialog"
import { ArrowUpDown } from "lucide-react"
export type Category = {
    id: string
    name: string
    // status: "pending" | "processing" | "success" | "failed"
    createdAt: string
}


export const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "created",
      header: () => <div className="text-right">Created At</div>,
      cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("created")).toDateString();
      // const formattedtime = new Date(row.getValue("created")).toLocaleTimeString();
      
 
      return <div className="text-right font-medium">{formattedDate}</div>
    },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const categoryInfo = row.original
        
        const router = useRouter();

        return (
          <div className="space-x-2">
         {/* <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"> */}
         <Button className="bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 border border-gray-300 rounded shadow-sm"
         onClick={() => router.push(`/dashboard/admin/category/${categoryInfo.id}`)}
         >
          Update
          </Button>
          <AlertDialogBox id={categoryInfo.id.toString()}/>

          </div>
        )
      }
    }
  ]


