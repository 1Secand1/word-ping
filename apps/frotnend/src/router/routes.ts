import type { RouteRecordRaw } from "vue-router";
import wordSpeakerRoute from "@/modules/wordSpeaker/routes";
import aboutRoute from "@/modules/about/routers";
import vocabularyManager from "@/modules/vocabularyManager/routes";

const routes: RouteRecordRaw[] = [
  wordSpeakerRoute,
  aboutRoute,
  vocabularyManager,
];

export { routes };
