import dynamic from "next/dynamic";

const components = {
  adguard: dynamic(() => import("./adguard/component")),
  bazarr: dynamic(() => import("./bazarr/component")),
  coinmarketcap: dynamic(() => import("./coinmarketcap/component")),
  docker: dynamic(() => import("./docker/component")),
  emby: dynamic(() => import("./emby/component")),
  gotify: dynamic(() => import("./gotify/component")),
  jackett: dynamic(() => import("./jackett/component")),
  jellyfin: dynamic(() => import("./emby/component")),
  jellyseerr: dynamic(() => import("./jellyseerr/component")),
  mastodon: dynamic(() => import("./mastodon/component")),
  npm: dynamic(() => import("./npm/component")),
  nzbget: dynamic(() => import("./nzbget/component")),
  ombi: dynamic(() => import("./ombi/component")),
  overseerr: dynamic(() => import("./overseerr/component")),
  pihole: dynamic(() => import("./pihole/component")),
  portainer: dynamic(() => import("./portainer/component")),
  prowlarr: dynamic(() => import("./prowlarr/component")),
  qbittorrent: dynamic(() => import("./qbittorrent/component")),
  radarr: dynamic(() => import("./radarr/component")),
  readarr: dynamic(() => import("./readarr/component")),
  rutorrent: dynamic(() => import("./rutorrent/component")),
  sabnzbd: dynamic(() => import("./sabnzbd/component")),
  sonarr: dynamic(() => import("./sonarr/component")),
  speedtest: dynamic(() => import("./speedtest/component")),
  strelaysrv: dynamic(() => import("./strelaysrv/component")),
  tautulli: dynamic(() => import("./tautulli/component")),
  traefik: dynamic(() => import("./traefik/component")),
  transmission: dynamic(() => import("./transmission/component")),
};

export default components;
