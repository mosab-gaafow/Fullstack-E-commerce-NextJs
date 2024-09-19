"use client"

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios';
import { API } from '@/lib/config';
import Loading from '../loading';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '../Columns';

const List = () => {

   const { isLoading, isError, data } = useQuery({
        queryKey: ['category'],
        queryFn: () => axios.get(`${API}/admin/category`).then(res => res.data),
        staleTime: 60 * 1000,  // 60 seconds
        retry: 3 // retry fetching 3 times on failure
    });

    if (isLoading) {
        return <Loading />;  // Show a loading component while data is fetching
    }

    if (isError || !data || data.length === 0) {
        return <p>No categories available.</p>; // Handle errors or empty data
    }

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default List;
