import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const { data: wantedData, error: wantedError } = useWidgetAPI(widget, "wanted/missing");
  const { data: queuedData, error: queuedError } = useWidgetAPI(widget, "queue");
  const { data: seriesData, error: seriesError } = useWidgetAPI(widget, "series");

  if (wantedError || queuedError || seriesError) {
    return <Container error={t("widget.api_error")} />;
  }

  if (!wantedData || !queuedData || !seriesData) {
    return (
      <Container>
        <Block label={t("sonarr.wanted")} />
        <Block label={t("sonarr.queued")} />
        <Block label={t("sonarr.series")} />
      </Container>
    );
  }

  return (
    <Container>
      <Block label={t("sonarr.wanted")} value={wantedData.totalRecords} />
      <Block label={t("sonarr.queued")} value={queuedData.totalRecords} />
      <Block label={t("sonarr.series")} value={seriesData.total} />
    </Container>
  );
}
