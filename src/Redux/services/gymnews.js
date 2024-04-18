// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { serialize_obj_to_url_args } from '../../tools'

console.log(serialize_obj_to_url_args(
  {
    perPage: 10,
    page: 1
  })
)

// ВНИМАНИЕ НА ИМЯ endopoint'ов и того, что экспортируется!


// Define a service using a base URL and expected endpoints
export const wp_drafts_api = createApi({
  reducerPath: 'wp_drafts_api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/' }),
  endpoints: (builder) => ({
    getPagedDrafts: builder.query({
        query: (args) => ({
            url : `posts?status=draft&per_page=${args.perPage}${args.page > 1 ? '&page=' + args.page : ''}`,
            //url : serialize_obj_to_url_args(args) ,//`https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts?status=draft&per_page=${args.perPage}${args.page > 1 ? '&page=' + args.page : ''}`,
            method : "GET",
            // чтобы заголовки были доступны
            headers : {
                'Content-type' : "application/json",
                'Authorization' : 'Bearer ' + sessionStorage.getItem('bearerToken')
            }
        }),
        // дополнительно нужны заголовки от wordpressa
        transformResponse(apiResponse, meta) {
            return {    
                        data: apiResponse, 
                        totalPosts: Number(meta.response.headers.get('X-Wp-Total')),
                        totalPages: Number(meta.response.headers.get('X-Wp-Totalpages')),
                   }
        },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPagedDraftsQuery } = wp_drafts_api