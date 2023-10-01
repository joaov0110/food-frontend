import { FC } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CoverImage from "../../components/CoverImage";
import ProfileImage from "../../components/ProfileImage";
import FileUploadDialog from "../../components/Dialogs/FileUploadDialog";
import { Box, Skeleton, Grid } from "@mui/material";
import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser, { IgetUser, updateUser } from "../../hooks/useUserClient";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../../components/Form/TextInput";
import Address from "../../components/Form/Address";
import profileSchema from "../../schemas/profileSchema";
import "./index.scss";
import { GET_USER } from "../../constants/queries";
import { useWarningMethods } from "../../hooks/useWarning";
import { renderProfileImages } from "../../utils/renderProfileImages";

const Profile: FC = () => {
  const queryClient = useQueryClient();

  const {
    fetchUser,
    updateUser,
    updateUserProfileImage,
    updateUserCoverImage,
  } = useUser();

  const { openWarning } = useWarningMethods();

  const { isLoading, isError, data } = useQuery<IgetUser, Error>({
    queryKey: [GET_USER],
    queryFn: fetchUser,
  });

  const editUser = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_USER);
      openWarning({
        type: "success",
        message: "Profile updated",
      });
    },
    onError: (err: any) => {
      openWarning({
        type: "error",
        message: err,
      });
    },
  });

  const methods = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: data!.name,
      email: data!.email,
      document: data!.document,
      accountant_email: data!.accountant_email,
      accountant_name: data!.accountant_name,
      accountant_phone: data!.accountant_phone,
      image_url: data!.image_url,
      bgImage_url: data!.bgImage_url,
      postalCode: data!.address!.postalCode,
      street: data!.address!.street,
      street_number: data!.address!.street_number,
      district: data!.address!.district,
      city: data!.address!.city,
      UF: data!.address!.UF,
    },
  });

  const { handleSubmit } = methods;

  const submit = (data: updateUser) => {
    editUser.mutate(data);
  };

  if (isLoading || isError) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <FormProvider {...methods}>
      <Box component="form" className="profile__settings">
        <FileUploadDialog
          data={{
            dialogTitle: "Change cover image",
            confirmButtonText: "Save",
            buttonType: "loading",
            invalidateQuery: GET_USER,
            opener: (
              <CoverImage image={renderProfileImages(data?.bgImage_url)} />
            ),
          }}
          methods={{
            uploader: updateUserCoverImage,
          }}
        />
        <Box className="profile__settings__image">
          <FileUploadDialog
            data={{
              dialogTitle: "Change profile picture",
              confirmButtonText: "Save",
              buttonType: "loading",
              invalidateQuery: GET_USER,
              opener: (
                <ProfileImage image={renderProfileImages(data?.image_url)} />
              ),
            }}
            methods={{
              uploader: updateUserProfileImage,
            }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className="input-item">
            <TextInput name="name" placeholder="Name" />
          </Grid>
          <Grid item xs={12} sm={4} className="input-item">
            <TextInput name="email" placeholder="Email" />
          </Grid>
          <Grid item xs={12} sm={4} className="input-item">
            <TextInput name="document" placeholder="Document" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className="input-item">
            <TextInput name="accountant_name" placeholder="Accountant name" />
          </Grid>
          <Grid item xs={12} sm={4} className="input-item">
            <TextInput name="accountant_email" placeholder="Accountant email" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput name="accountant_phone" placeholder="Accountant phone" />
          </Grid>
        </Grid>
        <Address />

        <Box className="button-container">
          <LoadingButton
            variant="contained"
            endIcon={<Check />}
            loading={editUser.isLoading}
            loadingPosition="end"
            onClick={handleSubmit(submit)}
          >
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Profile;
