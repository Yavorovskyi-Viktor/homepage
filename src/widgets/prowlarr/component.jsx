import useSWR from "swr";
import { useTranslation } from "next-i18next";

import Widget from "components/services/widgets/widget";
import Block from "components/services/widgets/block";
import { formatProxyUrl } from "utils/proxy/api-helpers";

export default function Component({ service }) {
  const { t } = useTranslation();

  const config = service.widget;

  const { data: indexersData, error: indexersError } = useSWR(formatProxyUrl(config, "indexer"));
  const { data: grabsData, error: grabsError } = useSWR(formatProxyUrl(config, "indexerstats"));

  if (indexersError || grabsError) {
    return <Widget error={t("widget.api_error")} />;
  }

  if (!indexersData || !grabsData) {
    return (
      <Widget>
        <Block label={t("prowlarr.enableIndexers")} />
        <Block label={t("prowlarr.numberOfGrabs")} />
        <Block label={t("prowlarr.numberOfQueries")} />
        <Block label={t("prowlarr.numberOfFailGrabs")} />
        <Block label={t("prowlarr.numberOfFailQueries")} />
      </Widget>
    );
  }

  const indexers = indexersData?.filter((indexer) => indexer.enable === true);

  let numberOfGrabs = 0;
  let numberOfQueries = 0;
  let numberOfFailedGrabs = 0;
  let numberOfFailedQueries = 0;
  grabsData?.indexers?.forEach((element) => {
    numberOfGrabs += element.numberOfGrabs;
    numberOfQueries += element.numberOfQueries;
    numberOfFailedGrabs += numberOfFailedGrabs + element.numberOfFailedGrabs;
    numberOfFailedQueries += numberOfFailedQueries + element.numberOfFailedQueries;
  });

  return (
    <Widget>
      <Block label={t("prowlarr.enableIndexers")} value={indexers.length} />
      <Block label={t("prowlarr.numberOfGrabs")} value={numberOfGrabs} />
      <Block label={t("prowlarr.numberOfQueries")} value={numberOfQueries} />
      <Block label={t("prowlarr.numberOfFailGrabs")} value={numberOfFailedGrabs} />
      <Block label={t("prowlarr.numberOfFailQueries")} value={numberOfFailedQueries} />
    </Widget>
  );
}
