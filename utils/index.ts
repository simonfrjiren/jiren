export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shortAddress(address?: string, numOfShow = 4) {
  if (!address) return "";
  const tmpAddress = address.trim();
  if (tmpAddress.length <= 22) return tmpAddress;

  return `${tmpAddress.substring(0, numOfShow)}...${tmpAddress.substring(
    tmpAddress.length - numOfShow,
    tmpAddress.length
  )}`;
}

export const formatNumber = (number?: string | number, behind = 5) => {
  if (number === undefined) return "";
  if (number === "0" || Number(number) === 0) {
    return "0";
  }
  const min = 1 / Math.pow(10, behind);
  if (Math.abs(Number(number)) < min) {
    if (behind === 0) return "< 0.0001";
    return `< 0.${"0".repeat(behind - 1)}1`;
  }
  let value = number.toString();

  if (value.includes(".") || value.includes(",")) {
    value = value.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    const [frontDot, behindDot] = value.split(".");
    const tmpSub =
      Math.round(Number(`0.${behindDot}`) * Math.pow(10, behind)) /
      Math.pow(10, behind);
    const sub = tmpSub === 0 ? "0" : tmpSub.toString().split(".")[1];

    value = `${frontDot}${sub ? "." : ""}${sub}`;
  } else {
    value = value.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  return value;
};

export function getTimeToDiff(time: number | string) {
  if (!time) return "";
  const now = Math.floor(Date.now() / 1000);
  let finalTime: number = time as number;
  if (typeof time === "string") {
    const date = new Date(time);
    finalTime = Math.floor(date.getTime() / 1000);
  }

  const diff = Math.floor((now - finalTime) / 60); // minute
  if (diff < 0) {
    return "";
  }
  if (diff === 0) return "Just now";
  if (diff < 60) return `${diff} minutes ago`;
  if (diff < 24 * 60)
    return Math.floor(diff / 60) + " hour" + (diff > 120 ? "s" : "") + " ago";
  return Math.floor(diff / (24 * 60)) + "d" + " ago";
}
