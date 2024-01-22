/* eslint-disable no-unused-vars */
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Date } from "next-auth/providers/kakao";

declare global {
    type GendersEnum = {
        UNISEX: "UNISEX"
        MALE: "MALE"
        FEMALE: "FEMALE"
    }
    type RolesModelType = {
        id: string
        name: string
        created_at: Date | null
        updated_at: Date | null
    }
    type UserModelType = {
        id: string
        fullname: string
        username: string
        email: string
        emailVerified: Date | null
        password: string
        role: string
        images: string[]
        createdAt: Date | null
        updatedAt: Date | null
    }
    type AudiencesModelType = {
        id: string
        name: string
        images: string[]
        createdAt: Date | null
        updatedAt: Date | null
    }
    type CategoriesModelType = {
        id: string
        name: string
        slug: string
        images: string[]
        description: string
        createdAt: Date | null
        updatedAt: Date | null
    }
    type GenresModelType = {
        id: string
        name: string
        slug: string
        images: string[]
        description: string
        createdAt: Date | null
        updatedAt: Date | null
    }
    type SeriesModelType = {
        id: string
        name: string
        slug: string
        images: string[]
        description: string
        createdAt: Date | null
        updatedAt: Date | null
    }
    type ProductsModelType = {
        id: string
        gender: GendersEnum[keyof GendersEnum]
        audienceId: string
        categoryId: string
        genresId: string
        seriesId: string
        name: string
        slug: string
        description: string
        specs: string
        images: string[]
        price: number
        stock: number
        createdAt: Date | null;
        updatedAt: Date | null;
    }
    type EventsModelType = {
        id: string
        name: string
        slug: string
        description: string
        images: string[]
        status: boolean
        beginDate: Date | null
        endDate: Date | null
        createdAt: Date | null
        updatedAt: Date | null
    }
    namespace JSX {
        interface IntrinsicElements {
            'iconify-icon': DetailedHTMLProps<HTMLAttributes, HTMLElement>
        }
    }
}
