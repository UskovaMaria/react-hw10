import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3001';
const goodsTagObj = { type: 'Goods', id: 'LIST' };

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Goods'],

  endpoints: (build) => ({

    getGoods: build.query({
      query: () => 'goods',
      providesTags: (result) => (
        result
          ? [
              ...result.map(( { id } ) => ( { type: 'Goods', id} )),
              goodsTagObj
            ]
          : [ goodsTagObj ]
      ),
    }),

    addGood: build.mutation({
      query: (body) => ({
        url: 'goods',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ goodsTagObj ]
    }),

  }),

});

export const { useGetGoodsQuery, useAddGoodMutation } = goodsApi;