export const getCompanyLogoLinkFromURI = (uri) => {
  if (uri)
    return `https://logo.clearbit.com/${
      uri.replace(/(^\w+:|^)\/\//, "").split("/")[0]
    }`;
};

export const getBackendURL = () =>
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_BACKEND_ENDPOINT
    : process.env.REACT_APP_PROD_BACKEND_ENDPOINT;

export const getHumanDateFromEpoch = (epoch) => {
  return new Date(Number(epoch)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
