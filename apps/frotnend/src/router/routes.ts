import type { RouteRecordRaw } from "vue-router";
import wordSpeakerRoute from "@/modules/wordSpeaker/routes";
import aboutRoute from "@/modules/about/routers";

const routes: RouteRecordRaw[] = [
  wordSpeakerRoute,
  aboutRoute,
];

export { routes };
