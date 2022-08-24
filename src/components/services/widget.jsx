import Sonarr from "./widgets/sonarr";
import Radarr from "./widgets/radarr";
import Ombi from "./widgets/ombi";
import Portainer from "./widgets/portainer";

const widgetMappings = {
  sonarr: Sonarr,
  radarr: Radarr,
  ombi: Ombi,
  portainer: Portainer,
};

export default function Widget({ service }) {
  const ServiceWidget = widgetMappings[service.widget.type];

  if (ServiceWidget) {
    return <ServiceWidget service={service} />;
  }

  return (
    <div className="bg-theme-200/50 dark:bg-theme-900/20 rounded m-1 flex-1 flex flex-col items-center justify-center p-1">
      <div className="font-thin text-sm">
        Missing Widget Type: <strong>{service.widget.type}</strong>
      </div>
    </div>
  );
}
