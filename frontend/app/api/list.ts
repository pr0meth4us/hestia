import axios from "axios";

import {Group, ListItem} from "@/app/types/list";
import {ApiResponse} from "@/app/types/auth";

const API_BASE_URL = "/auth";

export const listApi = {
  getList: async (): Promise<ListItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/lists`);

    return response.data.data;
  },

  group: async (
    listId: string,
    size: string,
    number: string,
    exclusions: string,
  ): Promise<Group[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/lists/${listId}/group?size=${size}&number${number}&$exclusions=${exclusions}`,
    );

    return response.data.data;
  },

  getListById: async (id: string): Promise<ListItem> => {
    const response = await axios.get(`${API_BASE_URL}/lists/${id}`);

    return response.data.data;
  },

  deleteList: async (id: string): Promise<ApiResponse> => {
    const response = await axios.delete(`${API_BASE_URL}/lists/${id}`);

    return response.data;
  },

  deleteItem: async (id: string, itemIndex: number): Promise<ApiResponse> => {
    return await axios.delete(
      `${API_BASE_URL}/lists/${id}/items/${itemIndex}/delete`,
    );
  },

  editItem: async (
    id: string,
    itemIndex: number,
    editValue: string,
  ): Promise<ApiResponse> => {
    return await axios.put(
      `${API_BASE_URL}/lists/${id}/items/${itemIndex}/edit`,
      `"${editValue}"`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      },
    );
  },

  addItem: async (
    id: string,
    newValue: string,
  ):
  Promise<ApiResponse> => {
    return await axios.post(
      `${API_BASE_URL}/lists/${id}/items/add`,
      `"${newValue}"`,
      {
        headers: {
          "Content-Type": "text/plain",
        }
      }
    )
  }
};

export type { ListItem };
