import useSWR from "swr";
import { useTranslation } from "next-i18next";

import Widget from "components/services/widgets/widget";
import Block from "components/services/widgets/block";
import { formatProxyUrl } from "utils/proxy/api-helpers";

export default function Component({ service }) {
  const { t } = useTranslation();

  const config = service.widget;

  const { data: indexersData, error: indexersError } = useSWR(formatProxyUrl(config, "indexers"));

  if (indexersError) {
    return <Widget error={t("widget.api_error")} />;
  }

  if (!indexersData) {
    return (
      <Widget>
        <Block label={t("jackett.configured")} />
        <Block label={t("jackett.errored")} />
      </Widget>
    );
  }

  const errored = indexersData.filter((indexer) => indexer.last_error);

  return (
    <Widget>
      <Block label={t("jackett.configured")} value={t("common.number", { value: indexersData.length })} />
      <Block label={t("jackett.errored")} value={t("common.number", { value: errored.length })} />
    </Widget>
  );
}
