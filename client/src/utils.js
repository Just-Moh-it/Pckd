export const getCompanyLogoLinkFromURI = (uri) => {
  if (uri)
    return `https://logo.clearbit.com/${
      uri.replace(/(^\w+:|^)\/\//, "").split("/")[0]
    }`;
};

export const getBackendURL = () => {
  const uri =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_BACKEND_ENDPOINT
      : process.env.REACT_APP_PROD_BACKEND_ENDPOINT &&
        `${window.location.protocol}://${window.location.host}:${window.location.port}`;

  // return URI, and relplace /undefined/ with /
  return uri.replace(/undefined/g, "/");
};

export const getHumanDateFromEpoch = (epoch) => {
  return (
    new Date(Number(epoch)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) || epoch
  );
};
export const getHumanTimeFromEpoch = (epoch) => {
  return (
    new Date(Number(epoch)).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }) || epoch
  );
};

export const flattenObject = (ob) => {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
