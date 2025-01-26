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
        {/* eslint-disable-next-line no-restricted-syntax */}
        <div style={{ background: "#FFFFFFCC", padding: "20px" }}>
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
            <br />
            са Reddit-a:{" "}
            <a href="https://www.reddit.com/r/serbia/comments/1i8g4j7/megathread_spisak_ugostiteljskih_objekata_koji_su/?share_id=2QyWlGUo8q8HdOoQAPR3h&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1">
              [Megathread] Spisak ugostiteljskih objekata koji su se izrugali
              studentima
            </a>
            <div
              style={{
                background: "white",
                /* eslint-disable-next-line no-restricted-syntax */
                marginTop: "20px",
                fontWeight: "bold",
                /* eslint-disable-next-line no-restricted-syntax */
                padding: "20px",
              }}
            >
              <span style={{ fontSize: "28px" }}>Дисклејмер за Ћаци:</span>{" "}
              <br />
              Сајт https://snsblacklist.com објављује информације о
              угоститељским објектима који су радили или нису учествовали у
              штрајку/бојкот позиву дана 24.01.2025. Све наведене информације на
              Сајту прикупљене су из јавно доступних извора, као и од корисника
              и посетилаца Сајта, а аутор Сајта није лично саставио нити
              самостално креирао овај списак.
              <br />
              <br />
              Циљ овог Сајта није позив на насиље, нападе или било какве сличне
              активности, већ искључиво информисање јавности о угоститељским
              објектима који нису одлучили да дају директну подршку студентима
              на њихов позив. Све информације објављене на Сајту искључиво су
              информативног карактера.
            </div>
          </Typography>
        </div>

        <Lokali />
      </Grid>
    </Container>
  );
}
