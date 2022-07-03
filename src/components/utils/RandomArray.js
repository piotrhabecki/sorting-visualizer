export const randomArray = (length, min, max) => {
    let i = -1;
    const array = [...new Array(length)].map(() => {
      i = i + 1;
      return {
        value: Math.round(Math.random() * (max - min + 1) + min),
        index: i,
        key: i,
        color: "#d3c0ff",
      };
    });

    return array;
  };