import axios from "axios";
import { env } from "../../config/env";
import type { WebHookData } from "./type";

class WebHookService {
  async send(body: WebHookData) {
    const { data } = await axios.post(env.WEBHOOK_URL, body);
    return data;
  }
}

export default new WebHookService();