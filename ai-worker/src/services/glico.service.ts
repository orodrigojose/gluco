import type { AxiosInstance } from "axios";
import { api } from "./axios.service";

export default class GlicoService {
  private api: AxiosInstance;

  constructor() {
    this.api = api;
  }

  public async register(payload: any) {
    const { data } = await this.api.post("/glico/", payload);
    return data;
  }
}
