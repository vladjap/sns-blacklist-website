"use client";

import Button from "@mui/material/Button";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useEffect } from "react";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import useLeavePage from "@/services/leave-page/use-leave-page";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useParams } from "next/navigation";
import {
  useGetLokalService,
  usePatchLokalService,
} from "@/services/api/services/lokals";

type EditLokalFormData = {
  name: string;
  address?: string;
  city?: string;
  google_map_link?: string;
  instagram?: string;
};

const useValidationEditUserSchema = () => {
  return yup.object().shape({
    name: yup.string().required("polje je obavezno"),
  });
};

function EditUserFormActions() {
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      Save
    </Button>
  );
}

function FormEditUser() {
  const params = useParams<{ id: string }>();
  const lokalId = params.id;
  const fetchGetLokal = useGetLokalService();
  const fetchPatchLokal = usePatchLokalService();
  const { t } = useTranslation("admin-panel-users-edit");
  const validationSchema = useValidationEditUserSchema();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditLokalFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      google_map_link: "",
      instagram: "",
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchPatchLokal({
      id: Number(lokalId),
      data: formData,
    });
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof EditLokalFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-users-edit:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      reset(formData);
      enqueueSnackbar(t("admin-panel-users-edit:alerts.user.success"), {
        variant: "success",
      });
    }
  });

  useEffect(() => {
    const getInitialDataForEdit = async () => {
      const { status, data: lokal } = await fetchGetLokal({
        id: Number(lokalId),
      });

      if (status === HTTP_CODES_ENUM.OK) {
        reset({
          name: lokal?.name ?? "",
          address: lokal?.address ?? "",
          city: lokal?.city ?? "",
          google_map_link: lokal?.google_map_link ?? "",
          instagram: lokal?.instagram ?? "",
        });
      }
    };

    getInitialDataForEdit();
  }, [lokalId, reset, fetchGetLokal]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditLokalFormData> name="name" label={"Name"} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditLokalFormData>
                name="address"
                label={"Address"}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditLokalFormData> name="city" label={"City"} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditLokalFormData>
                name="google_map_link"
                label={"Google Map Link"}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditLokalFormData>
                name="instagram"
                label={"Instagram"}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <EditUserFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/users"
                >
                  {t("admin-panel-users-edit:actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function EditUser() {
  return <FormEditUser />;
}

export default withPageRequiredAuth(EditUser);
