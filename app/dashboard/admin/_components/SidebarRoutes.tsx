"use client"

import {  CarrotIcon,  ShoppingCartIcon, UserIcon } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem'

const routes = [
    {
        id: 1,
        icon: CarrotIcon,
        label: 'Products',
        href: '/dashboard/admin/product'
    },

    {
        id: 2,
        icon: ShoppingCartIcon,
        label: 'Categories',
        href: '/dashboard/admin/category'
    },
    {
        id: 3,
        icon: ShoppingCartIcon,
        label: 'Orders',
        href: '/dashboard/admin/orders'
    },
    {
        id: 4,
        icon: UserIcon,
        label: 'Users',
        href: '/dashboard/admin/user'
    }
]


const SidebarRoutes = () => {
    return (
        <div className='flex flex-col w-full '>
          {
            routes.map((route, index) => (
                <SidebarItem
                 key={route.id}
                 id={route.id}
                icon={route.icon}
                href = {route.href}
                label = {route.label}
    
                />
            ))
          }
        </div>
      )
}

export default SidebarRoutes
