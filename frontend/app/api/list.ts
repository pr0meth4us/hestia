import axios from "axios";

import { ListItem } from "@/app/types/list";

const API_BASE_URL = "/auth";

export const listApi = {
  getList: async (): Promise<ListItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/lists`);

    return response.data.data;
  },

  group: async (
    listId: string,
    size: number,
    number: number,
  ): Promise<ListItem[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/lists/${listId}/group?size=${size}&number${number}`,
    );

    return response.data;
  },

  getListById: async (id: string): Promise<ListItem> => {
    const response = await axios.get(`${API_BASE_URL}/lists/${id}`);

    return response.data.data;
  },
};
