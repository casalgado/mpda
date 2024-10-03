import * as Papa from "papaparse";

const cv_url =
  "https://docs.google.com/spreadsheets/d/1c-IcPlksnbt2WXM25x4Kjys3yjAd6AX9avt_l18UdaY/pub?gid=0&single=true&output=csv";

const getCvData = (url) => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        console.log("getCvData", results);
        data = results.data.filter((e) => e.description != "");
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          //console.log(element.bullets.split("\n"));
          element.bullets = element.bullets
            .split("\n")
            .map((e) => e.split("**"));
          // console.log(element.bullets);
        }
        //console.log(data);
        resolve(data);
      },
    });
  });
};

const getData = (url) => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        console.log("getData", results);
        data = results.data.filter((e) => e.description != "");

        //console.log(data);
        resolve(data);
      },
    });
  });
};

export const cv_data_spanish = getCvData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRd1b-iZ6Mlirbnt9dh75bkLcrie0-5BAdku84p5CYwPxUX7igHc-HGlTQiz6KGRpMqDjJAguddkKbB/pub?gid=0&single=true&output=csv"
);
export const cv_data_english = getCvData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRd1b-iZ6Mlirbnt9dh75bkLcrie0-5BAdku84p5CYwPxUX7igHc-HGlTQiz6KGRpMqDjJAguddkKbB/pub?gid=1911678839&single=true&output=csv"
);
export const skills_spanish = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRd1b-iZ6Mlirbnt9dh75bkLcrie0-5BAdku84p5CYwPxUX7igHc-HGlTQiz6KGRpMqDjJAguddkKbB/pub?gid=1080873736&single=true&output=csv"
);
export const skills_english = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRd1b-iZ6Mlirbnt9dh75bkLcrie0-5BAdku84p5CYwPxUX7igHc-HGlTQiz6KGRpMqDjJAguddkKbB/pub?gid=1546273566&single=true&output=csv"
);
export const intro_spanish = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRd1b-iZ6Mlirbnt9dh75bkLcrie0-5BAdku84p5CYwPxUX7igHc-HGlTQiz6KGRpMqDjJAguddkKbB/pub?gid=1685940129&single=true&output=csv"
);
export const intro_english = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRd1b-iZ6Mlirbnt9dh75bkLcrie0-5BAdku84p5CYwPxUX7igHc-HGlTQiz6KGRpMqDjJAguddkKbB/pub?gid=1240590975&single=true&output=csv"
);
