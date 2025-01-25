import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
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
      url: "https://snsblacklist.com/rs",
      siteName: "SNS Blacklist",
      images: [
        {
          url: "https://snsblacklist.com/ruke-800-600.jpg",
          width: 800,
          height: 600,
        },
        {
          url: "https://snsblacklist.com/ruke-1800-1600.jpg",
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
          За више детаља посетите инстаграм страницу{" "}
          <a href="https://www.instagram.com/sistem.restart?igsh=djY5bWw4bmljZTJ4">
            SISTEM/СИСТЕМ
          </a>
          .
          <br />
          <a href="https://www.google.com/maps/@44.7080531,17.6487525,7z/data=!4m3!11m2!2suimhzfjWSxO2ldC6sz4HgA!3e3?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw==">
            Додатни списак можете погледати овде.
          </a>
        </Typography>

        <Lokali />
      </Grid>
    </Container>
  );
}
