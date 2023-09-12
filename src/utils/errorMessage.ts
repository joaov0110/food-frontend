const errorMessage = (error: unknown) => {
  let message = "Unknown error";

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = String(error);
  }

  return message;
};

export default errorMessage;
