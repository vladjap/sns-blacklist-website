import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Trans } from "react-i18next/TransWithoutContext";
import Lokali from "@/components/lokal/lokali";
import Head from "next/head";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home(props: Props) {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta property="og:title" content="SNS Blacklist" />
        <meta property="og:description" content="SNS Lokali - blacklist" />
        <meta property="og:image" content="/ruke.svg" />
        <meta property="og:url" content="https://snsblacklist.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SNS Blacklist" />
      </Head>
      <Container maxWidth="xl">
        <Grid size="grow">
          <Typography
            mt={5}
            textAlign="center"
            variant="h3"
            data-testid="home-title"
            gutterBottom
          >
            {t("title")}
          </Typography>
          <Typography textAlign="center" mb={3}>
            <Trans i18nKey={`description`} t={t} />
          </Typography>

          <Lokali />
        </Grid>
      </Container>
    </>
  );
}
