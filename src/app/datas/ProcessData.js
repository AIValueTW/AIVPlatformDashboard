export function processRadial({ rawData, checkIndex }) {

  let value = rawData?.value[checkIndex];
  let processedData = {
    name: ["參與率"],
    value: [value],
  };

  return processedData;
}

export function processBar({ rawData }) {
  let nameTemp = [];
  let valueTemp = [];
  if (rawData.length) {
    rawData.map((datum) => {
      nameTemp.push(datum.id);
      valueTemp.push(datum.value);
    });
  }
  let processedData = {
    name: nameTemp,
    value: valueTemp,
  };
  return processedData;
}

export function processTreemap({ rawData }) {
  let processedData = rawData.map(({ id, value }) => ({ x: id, y: value }));

  return processedData;
}
