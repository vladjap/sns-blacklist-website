import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Trans } from "react-i18next/TransWithoutContext";
import Lokali from "@/components/lokal/lokali";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
    openGraph: {
      title: "SNS Blacklist",
      description: "SNS Lokali - blacklist",
      url: "https://snsblacklist.com",
      siteName: "SNS Blacklist",
      images: [
        {
          url: "https://snsblacklist.com/ruke.svg",
          width: 800,
          height: 600,
        },
        {
          url: "https://snsblacklist.com/ruke.svg",
          width: 1800,
          height: 1600,
          alt: "Ruke",
        },
      ],
      locale: "sr_RS",
      type: "website",
    },
  };
}

export default async function Home(props: Props) {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return (
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
  );
}
