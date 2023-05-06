import { navbar } from "vuepress-theme-hope";
import { inject } from "@vercel/analytics";

inject();

export const zh = navbar([
  "/",
  {
    text: "分享",
    icon: "share",
    prefix: "/shares/",
    children: [
      {
        text: "AWS的ECS介绍",
        link: "AWS的ECS介绍/AWS的ECS介绍",
      },
      {
        text: "TRTC实时音视频",
        link: "TRTC实时音视频/TRTC实时音视频",
      },
    ],
  },
  {
    text: "关于佳哥",
    icon: "emoji",
    link: "/about/",
  },
]);
