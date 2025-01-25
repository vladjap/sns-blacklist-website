"use client";

import Button from "@mui/material/Button";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import useLeavePage from "@/services/leave-page/use-leave-page";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useRouter } from "next/navigation";
import { usePostLokalService } from "@/services/api/services/lokals";
import useBodyBackground from "@/hooks/useBodyBackground";

type CreateFormData = {
  name: string;
  address?: string;
  city?: string;
  google_map_link?: string;
  instagram?: string;
};

const useValidationSchema = () => {
  return yup.object().shape({
    name: yup.string().required("polje je obavezno"),
  });
};

function CreateUserFormActions() {
  const { t } = useTranslation("admin-panel-users-create");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("admin-panel-users-create:actions.submit")}
    </Button>
  );
}

function FormCreateLokal() {
  const router = useRouter();
  const fetchPostLokal = usePostLokalService();
  const { t } = useTranslation("admin-panel-users-create");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();
  useBodyBackground();


  const methods = useForm<CreateFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      google_map_link: "",
      instagram: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchPostLokal(formData);
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof CreateFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: "doslo je do greske",
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar("Success", {
        variant: "success",
      });
      router.push("/admin-panel/lokals");
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit} autoComplete="create-new-user">
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">
                {t("admin-panel-users-create:title")}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData> name="name" label={"Name"} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData> name="address" label={"Address"} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData> name="city" label={"City"} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="google_map_link"
                label={"Google Map Link"}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="instagram"
                label={"Instagram"}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CreateUserFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/users"
                >
                  {t("admin-panel-users-create:actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function CreateLokal() {
  return <FormCreateLokal />;
}

export default withPageRequiredAuth(CreateLokal);
