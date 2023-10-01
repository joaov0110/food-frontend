export const renderProfileImages = (image?: string | null) => {
  if (image) {
    return image;
  }

  return "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg";
};
