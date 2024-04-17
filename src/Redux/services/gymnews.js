// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const wp_drafts_api = createApi({
  reducerPath: 'wp_drafts_api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts?status=draft' }),
  endpoints: (builder) => ({
    getDrafts: builder.query({
        query: (args) => ({
            url : `https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts?status=draft&per_page=${args.perPage}${args.page > 1 ? '&page=' + args.page : ''}`,
            method : "GET",
            // чтобы заголовки были доступны
            headers : {
                'Content-type' : "application/json",
                'Authorization' : 'Bearer ' + sessionStorage.getItem('bearerToken')
            }
        }),
        // дополнительно нужны заголовки от wordpressa
        transformResponse(apiResponse, meta) {
            return {    data: apiResponse, 
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